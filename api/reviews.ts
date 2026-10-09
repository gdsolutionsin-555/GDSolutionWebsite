// Vercel serverless function: GET /api/reviews
// Fetches your Google Maps rating + latest reviews with the official Places API (New).
// Keys stay on the server. Set these in Vercel -> Settings -> Environment Variables:
//   GOOGLE_PLACES_API_KEY  (Google Cloud API key, restricted to "Places API (New)")
//   GOOGLE_PLACE_ID        (your business Place ID, starts with "ChIJ")

declare const process: { env: Record<string, string | undefined> };

interface GoogleReview {
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  publishTime?: string;
}

function json(body: unknown, status = 200, cache = 'no-store'): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': cache },
  });
}

export async function GET(): Promise<Response> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return json({ error: 'Reviews are not configured.' }, 503);

  let upstream: Response;
  try {
    upstream = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,googleMapsUri,reviews',
      },
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return json({ error: 'Google did not respond in time.' }, 504);
  }

  if (!upstream.ok) {
    console.error('Places API error', upstream.status, await upstream.text().catch(() => ''));
    return json({ error: 'Could not load reviews.' }, 502);
  }

  const place = await upstream.json();
  const reviews = ((place.reviews ?? []) as GoogleReview[])
    // Show Google's own wording, not a machine translation.
    .map((r) => ({
      author: r.authorAttribution?.displayName ?? 'Google user',
      authorUrl: r.authorAttribution?.uri ?? '',
      photo: r.authorAttribution?.photoUri ?? '',
      rating: r.rating ?? 0,
      text: (r.originalText?.text ?? r.text?.text ?? '').trim(),
      when: r.relativePublishTimeDescription ?? '',
      publishTime: r.publishTime ?? '',
    }))
    .filter((r) => r.text && r.rating > 0)
    .sort((a, b) => b.publishTime.localeCompare(a.publishTime));

  // Cached on Vercel's CDN for 30 minutes, so new reviews appear within ~30 min
  // and Google is only called a few times a day (keeps cost near zero).
  return json(
    {
      name: place.displayName?.text ?? '',
      rating: place.rating ?? 0,
      total: place.userRatingCount ?? 0,
      mapsUrl: place.googleMapsUri ?? '',
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
      reviews,
    },
    200,
    'public, s-maxage=1800, stale-while-revalidate=86400',
  );
}
