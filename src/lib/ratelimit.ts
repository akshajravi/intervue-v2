// Per-user rate limits on the two routes that spend Anthropic tokens.
//
// Redis rather than an in-memory Map: Vercel runs N concurrent instances, each
// with its own module scope, so a local counter enforces "40 per window" times
// however many instances happen to be warm. Worse, it looks correct in local
// testing and only fails under the load it exists to protect against.

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Both limiters share one connection; Upstash speaks HTTP, so there's no pool
// to exhaust from a serverless function.
const redis = Redis.fromEnv();

// Sliding window, not fixed: a fixed window lets someone spend the whole budget
// at 9:59 and the whole next one at 10:01.
export const chatLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(40, "10 m"),
  // Denials are remembered in-process, so a client hammering a warm instance
  // stops costing a Redis round-trip per attempt.
  ephemeralCache: new Map(),
  prefix: "rl:chat",
  analytics: false,
});

// An order of magnitude pricier than chat — 16k tokens with adaptive thinking —
// so this one is rationed by the day rather than the minute.
export const evaluateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "24 h"),
  ephemeralCache: new Map(),
  prefix: "rl:evaluate",
  analytics: false,
});

// Rounded up so "wait 0 minutes" never appears.
function describeWait(resetMs: number): string {
  const seconds = Math.max(1, Math.ceil((resetMs - Date.now()) / 1000));
  if (seconds < 60) return `${seconds} second${seconds === 1 ? "" : "s"}`;
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"}`;
}

/**
 * Returns a ready-to-send 429 when `userId` is over the limit, or null to
 * proceed. Redis being unreachable resolves to null on purpose: a limiter
 * outage should not take the interviewer down with it.
 */
export async function checkLimit(
  limiter: Ratelimit,
  userId: string,
  noun: string
): Promise<Response | null> {
  try {
    const { success, reset } = await limiter.limit(userId);
    if (success) return null;
    return Response.json(
      {
        error: `You've hit the ${noun} limit. Try again in ${describeWait(reset)}.`,
      },
      { status: 429 }
    );
  } catch {
    return null;
  }
}
