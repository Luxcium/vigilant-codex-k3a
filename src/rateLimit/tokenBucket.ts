import { BucketKind, RateLimitBucket } from './interfaces';

export class TokenBucketLimiter {
  private buckets: Record<BucketKind, RateLimitBucket> = {
    account: { capacity: 30, refillInterval: 1000, remaining: 30, reset: Date.now() },
    market: { capacity: 20, refillInterval: 1000, remaining: 20, reset: Date.now() }
  };

  async consume(kind: BucketKind): Promise<void> {
    while (this.buckets[kind].remaining <= 0) {
      const delay = this.buckets[kind].reset - Date.now();
      await new Promise((r) => setTimeout(r, Math.max(delay, 50)));
    }
    this.buckets[kind].remaining -= 1;
  }

  hydrate(kind: BucketKind, headers: Record<string, string>): void {
    const rem = Number(headers['x-ratelimit-remaining']);
    const reset = Number(headers['x-ratelimit-reset']) * 1000;
    if (!Number.isNaN(rem)) this.buckets[kind].remaining = rem;
    if (!Number.isNaN(reset)) this.buckets[kind].reset = reset;
  }

  handle429(kind: BucketKind, reset: number): void {
    this.buckets[kind].remaining = 0;
    this.buckets[kind].reset = reset * 1000;
  }
}
