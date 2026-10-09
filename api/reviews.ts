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

export async function GET(request: Request): Promise<Response> {
  // Visit /api/reviews?debug=1 to see WHY reviews are not loading (never shows your key).
  const debug = new URL(request.url).searchParams.get('debug') === '1';
  const fail = (error: string, status: number, detail: Record<string, unknown> = {}) =>
    json(debug ? { error, ...detail } : { error }, status);

  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) {
    return fail('Reviews are not configured.', 503, {
      GOOGLE_PLACES_API_KEY: key ? 'set' : 'MISSING',
      GOOGLE_PLACE_ID: placeId ? 'set' : 'MISSING',
      hint: 'Add the missing variable(s) in Vercel > Settings > Environment Variables (for Production), then redeploy.',
    });
  }

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
    return fail('Google did not respond in time.', 504);
  }

  if (!upstream.ok) {
    const body = await upstream.text().catch(() => '');
    console.error('Places API error', upstream.status, body);
    let googleMessage = '';
    try {
      googleMessage = JSON.parse(body)?.error?.message ?? '';
    } catch {
      /* ignore */
    }
    return fail('Could not load reviews.', 502, {
      googleStatus: upstream.status,
      googleMessage,
      placeIdStartsWith: placeId.slice(0, 5),
    });
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

  if (debug && !reviews.length) {
    return json({
      error: 'Google replied, but with no reviews that have text.',
      rating: place.rating ?? 0,
      total: place.userRatingCount ?? 0,
      reviewsReturnedByGoogle: (place.reviews ?? []).length,
    });
  }

  // Cached on Vercel's CDN for 3 hours, so new reviews appear within about 3 hours.
  // That caps Google calls at roughly 8 a day (~250 a month), far inside Google's
  // free allowance of 1,000 "Place Details Enterprise + Atmosphere" calls a month.
  // To change the delay, edit s-maxage below (seconds): 3600 = 1 hour, 10800 = 3 hours.
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
    'public, s-maxage=10800, stale-while-revalidate=86400',
  );
}
