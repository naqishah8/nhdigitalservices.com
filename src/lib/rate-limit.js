// Small in-memory sliding-window rate limiter for API routes.
// The site runs on a single VPS, so in-memory state is fine — there is no
// second instance to coordinate with. Keyed by a string the caller picks
// (usually the client IP).

const BUCKETS = new Map();
const MAX_BUCKETS = 5000; // soft cap on memory — prunes oldest entries

function prune(now) {
  if (BUCKETS.size <= MAX_BUCKETS) return;
  // Map iteration order is insertion order; drop the oldest 10%.
  const toDrop = Math.ceil(MAX_BUCKETS * 0.1);
  let i = 0;
  for (const key of BUCKETS.keys()) {
    BUCKETS.delete(key);
    if (++i >= toDrop) break;
  }
  // Also drop anything that's fully expired while we're here.
  for (const [key, bucket] of BUCKETS) {
    if (bucket.resetAt <= now) BUCKETS.delete(key);
  }
}

/**
 * Check & increment a bucket.
 * @param {string} key — unique identifier (e.g. `contact:1.2.3.4`)
 * @param {number} limit — max hits per window
 * @param {number} windowMs — window length in ms
 * @returns {{ ok: boolean, remaining: number, resetAt: number, retryAfter: number }}
 */
export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  let bucket = BUCKETS.get(key);

  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    BUCKETS.set(key, bucket);
    prune(now);
  }

  bucket.count += 1;
  const remaining = Math.max(0, limit - bucket.count);
  const retryAfter = bucket.count > limit ? Math.ceil((bucket.resetAt - now) / 1000) : 0;
  return {
    ok: bucket.count <= limit,
    remaining,
    resetAt: bucket.resetAt,
    retryAfter,
  };
}

/**
 * Pull the best-effort client IP from standard proxy headers, falling back
 * to a shared "unknown" bucket so callers can't bypass the limit by stripping
 * headers.
 */
export function clientIp(req) {
  const h = req.headers;
  const forwarded = h.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = h.get('x-real-ip');
  if (real) return real.trim();
  const cf = h.get('cf-connecting-ip');
  if (cf) return cf.trim();
  return 'unknown';
}

/**
 * Build a standard 429 JSON response with the usual headers.
 */
export function tooManyRequests(result, message = 'Too many requests. Please wait a moment and try again.') {
  return Response.json(
    { error: message },
    {
      status: 429,
      headers: {
        'Retry-After': String(result.retryAfter || 60),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
      },
    }
  );
}
