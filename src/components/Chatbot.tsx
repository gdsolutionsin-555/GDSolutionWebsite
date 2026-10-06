import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Send, X, Phone } from 'lucide-react';
import RobotAvatar from '@/components/RobotAvatar';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: Msg = {
  role: 'assistant',
  content:
    "Hi, I'm Lucky, GD Solutions' AI assistant. 👋 I can help with websites, AI automation & voice bots, CCTV and IT infrastructure.\n\nYou can chat with me in English, हिंदी or বাংলা.",
};

const QUICK_REPLIES = [
  'I need a website',
  'AI voice bot / automation',
  'CCTV & IT infrastructure',
  'Talk to your team',
];

// Turn plain assistant text into safe React nodes: **bold**, links, emails.
function renderInline(text: string): ReactNode[] {
  const re = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;
  return text.split(re).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(part)) {
      const clean = part.replace(/[.,;!?]+$/, '');
      return (
        <a key={i} href={clean} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline underline-offset-2">
          {clean}
        </a>
      );
    }
    if (/^[\w.+-]+@/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="font-medium text-brand-700 underline underline-offset-2">
          {part}
        </a>
      );
    }
    return part;
  });
}

function MessageBody({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => {
        const bullet = /^\s*[-•*]\s+/.test(line);
        const content = renderInline(bullet ? line.replace(/^\s*[-•*]\s+/, '') : line);
        if (bullet)
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span aria-hidden>•</span>
              <span>{content}</span>
            </div>
          );
        return line.trim() ? <p key={i}>{content}</p> : <div key={i} className="h-2" />;
      })}
    </>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Gentle nudge after a few seconds if the visitor hasn't opened the chat.
  useEffect(() => {
    const t = setTimeout(() => setShowTeaser(true), 8000);
    return () => clearTimeout(t);
  }, []);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Skip the local greeting; the API expects the conversation to start with the user.
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error || 'Request failed');
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      console.error('Chat request failed:', e);
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            (e instanceof Error && e.message !== 'Request failed' ? e.message + '\n\n' : "Sorry, I couldn't connect just now.\n\n") +
            'You can reach our team on WhatsApp at +91 82828 99565 or contact@gdsolutions.in.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showChips = messages.length === 1 && !loading;

  return (
    <>
      {/* Launcher (sits above the WhatsApp button) */}
      {!open && (
        <div className="fixed bottom-[5.75rem] right-5 z-[100] flex flex-col items-end gap-2 sm:bottom-[6.75rem] sm:right-7">
          {showTeaser && (
            <button
              onClick={() => setOpen(true)}
              className="max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-left text-sm font-medium text-ink-800 shadow-xl ring-1 ring-ink-200 animate-fade-in"
            >
              Need help? Ask Lucky 💬
            </button>
          )}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open chat with Lucky, GD Solutions AI assistant"
            className="group relative flex h-[84px] w-[84px] items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
          >
            <span className="robot-glow absolute inset-2 rounded-full bg-brand-500/50 blur-xl" />
            <span className="absolute inset-1 rounded-full bg-gradient-to-br from-ink-900 to-brand-900 shadow-[0_10px_30px_rgba(5,150,105,0.45)] ring-2 ring-brand-400/60" />
            <span className="relative -mt-0.5">
              <RobotAvatar size={66} />
            </span>
            <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-400" />
          </button>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <section
          role="dialog"
          aria-label="Chat with Lucky"
          className="fixed inset-0 z-[110] flex flex-col overflow-hidden bg-white shadow-2xl sm:inset-auto sm:bottom-6 sm:right-7 sm:h-[600px] sm:max-h-[calc(100vh-3rem)] sm:w-[390px] sm:rounded-2xl sm:ring-1 sm:ring-ink-200"
        >
          <header className="flex items-center gap-3 bg-gradient-to-r from-ink-950 to-brand-900 px-4 py-3.5 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/20 ring-1 ring-brand-300/40">
              <RobotAvatar size={36} thinking={loading} animated={false} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-tight">Lucky · GD Solutions</p>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-brand-400" /> AI assistant · EN / हिंदी / বাংলা
              </p>
            </div>
            <a
              href="tel:+918282899565"
              aria-label="Call GD Solutions"
              className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <Phone className="h-4.5 w-4.5" />
            </a>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-ink-50 px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <span className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-900">
                    <RobotAvatar size={22} animated={false} />
                  </span>
                )}
                <div
                  className={`max-w-[85%] space-y-1 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-brand-600 text-white'
                      : 'rounded-bl-sm bg-white text-ink-800 shadow-sm ring-1 ring-ink-200'
                  }`}
                >
                  {m.role === 'user' ? <p className="whitespace-pre-wrap">{m.content}</p> : <MessageBody text={m.content} />}
                </div>
              </div>
            ))}

            {showChips && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-brand-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-ink-200" aria-label="Lucky is typing">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-ink-400" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-ink-200 bg-white p-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              maxLength={1000}
              placeholder="Type your message…"
              className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-ink-200 bg-ink-50 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
