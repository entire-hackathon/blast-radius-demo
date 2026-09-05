/** In-memory per-key token bucket. */
export class TokenBucketRateLimiter {
  private readonly capacity: number;
  private readonly refillPerSec: number;
  private readonly buckets = new Map<string, { tokens: number; last: number }>();

  constructor(capacity = 10, refillPerSec = 1) {
    this.capacity = capacity;
    this.refillPerSec = refillPerSec;
  }

  /** Try to spend one token for `key`. Returns false when the bucket is empty. */
  take(key: string, now: number = Date.now()): boolean {
    const bucket = this.buckets.get(key) ?? { tokens: this.capacity, last: now };
    const elapsed = (now - bucket.last) / 1000;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + elapsed * this.refillPerSec);
    bucket.last = now;
    if (bucket.tokens < 1) {
      this.buckets.set(key, bucket);
      return false;
    }
    bucket.tokens -= 1;
    this.buckets.set(key, bucket);
    return true;
  }
}

export const redirectRateLimiter = new TokenBucketRateLimiter(20, 5);
