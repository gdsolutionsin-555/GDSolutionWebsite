// Vercel serverless function: POST /api/chat
// Keeps the Perplexity API key on the server. Set PERPLEXITY_API_KEY in Vercel.
import { SYSTEM_PROMPT } from './_knowledge';

declare const process: { env: Record<string, string | undefined> };

type Role = 'user' | 'assistant';
interface ChatMessage {
  role: Role;
  content: string;
}

const PERPLEXITY_URL = 'https://api.perplexity.ai/chat/completions';
const MODEL = process.env.PERPLEXITY_MODEL || 'sonar';
const MAX_MESSAGES = 14;
const MAX_CHARS = 1500;

// Best-effort per-instance rate limit (resets on cold start).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 12;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

// Perplexity requires strictly alternating roles starting with "user".
function normalize(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') continue;
    const content = m.content.trim().slice(0, MAX_CHARS);
    if (!content) continue;
    const last = out[out.length - 1];
    if (last && last.role === m.role) last.content += '\n' + content;
    else out.push({ role: m.role, content });
  }
  while (out.length && out[0].role !== 'user') out.shift();
  return out;
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return json({ error: 'Chat is not configured.' }, 500);

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return json({ error: 'Too many messages. Please wait a minute.' }, 429);

  let payload: { messages?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const messages = normalize(payload.messages);
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return json({ error: 'No message provided.' }, 400);
  }

  let upstream: Response;
  try {
    upstream = await fetch(PERPLEXITY_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.3,
        max_tokens: 600,
        disable_search: true, // answer from our knowledge base only, no live web results
      }),
      signal: AbortSignal.timeout(25_000),
    });
  } catch {
    return json({ error: 'The assistant is taking too long. Please try again.' }, 504);
  }

  if (!upstream.ok) {
    console.error('Perplexity error', upstream.status, await upstream.text().catch(() => ''));
    return json({ error: 'The assistant is unavailable right now.' }, 502);
  }

  const data = await upstream.json();
  let reply: string = data?.choices?.[0]?.message?.content ?? '';

  // Pull out the hidden lead block, if any.
  const leadMatch = reply.match(/<lead>([\s\S]*?)<\/lead>/i);
  if (leadMatch) {
    reply = reply.replace(/<lead>[\s\S]*?<\/lead>/gi, '');
    try {
      const lead = JSON.parse(leadMatch[1]);
      await forwardLead(lead, messages);
    } catch (e) {
      console.error('Lead parse/forward failed', e);
    }
  }

  // Strip citation markers and any leaked reasoning tags.
  reply = reply
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/\[\d+\]/g, '')
    .trim();

  if (!reply) reply = 'Sorry, I could not process that. Please try again or WhatsApp us at +91 82828 99565.';
  return json({ reply });
}

async function forwardLead(lead: Record<string, string>, history: ChatMessage[]) {
  if (!lead?.phone_number || !lead?.full_name) return;
  const record = {
    lead_source: 'GD Solutions AI Chatbot',
    timestamp: new Date().toISOString(),
    contact: {
      full_name: lead.full_name,
      phone_number: lead.phone_number,
      email: lead.email || '',
      company_name: lead.company_name || '',
    },
    inquiry_details: {
      primary_service_interest: lead.primary_service_interest || '',
      language_preference: lead.language_preference || 'English',
      project_notes: lead.project_notes || '',
      estimated_timeline: lead.estimated_timeline || 'Exploring',
    },
    routing: { assigned_email: 'contact@gdsolutions.in', whatsapp_notify: '+918282899565' },
    transcript_tail: history.slice(-6),
  };

  // Always visible in Vercel → Logs.
  console.log('NEW_LEAD', JSON.stringify(record));

  // Optional: forward to Zapier / Make / HubSpot / any webhook.
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    const secret = process.env.LEAD_WEBHOOK_SECRET;
    await fetch(hook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Make.com can filter on this header so only your site can create leads.
        ...(secret ? { 'x-webhook-secret': secret } : {}),
      },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8_000),
    }).catch((e) => console.error('Lead webhook failed', e));
  }
}
