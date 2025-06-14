import { BucketKind, RateLimitGroup } from './interfaces';
import { RULES } from './rules';

export class TokenBucketLimiter {
  private buckets: Record<BucketKind, RateLimitGroup> = {
    account: {
      perSecond: { capacity: RULES.account.rps, refillInterval: 1000, remaining: RULES.account.rps, reset: Date.now() },
      perHour: { capacity: RULES.account.rph, refillInterval: 3600_000, remaining: RULES.account.rph, reset: Date.now() }
    },
    market: {
      perSecond: { capacity: RULES.market.rps, refillInterval: 1000, remaining: RULES.market.rps, reset: Date.now() },
      perHour: { capacity: RULES.market.rph, refillInterval: 3600_000, remaining: RULES.market.rph, reset: Date.now() }
    }
  };

  async consume(kind: BucketKind): Promise<void> {
    const group = this.buckets[kind];
    while (group.perSecond.remaining <= 0 || group.perHour.remaining <= 0) {
      const delay = Math.min(
        group.perSecond.reset - Date.now(),
        group.perHour.reset - Date.now()
      );
      await new Promise((r) => setTimeout(r, Math.max(delay, 50)));
      this.refill(group);
    }
    group.perSecond.remaining -= 1;
    group.perHour.remaining -= 1;
  }

  hydrate(kind: BucketKind, headers: Record<string, string>): void {
    const group = this.buckets[kind];
    const secondRem = Number(headers['x-ratelimit-remaining-second'] ?? headers['x-ratelimit-remaining']);
    const secondReset = Number(headers['x-ratelimit-reset-second'] ?? headers['x-ratelimit-reset']) * 1000;
    const hourRem = Number(headers['x-ratelimit-remaining-hour']);
    const hourReset = Number(headers['x-ratelimit-reset-hour']) * 1000;

    if (!Number.isNaN(secondRem)) group.perSecond.remaining = secondRem;
    if (!Number.isNaN(secondReset)) group.perSecond.reset = secondReset;
    if (!Number.isNaN(hourRem)) group.perHour.remaining = hourRem;
    if (!Number.isNaN(hourReset)) group.perHour.reset = hourReset;
  }

  handle429(kind: BucketKind, reset: number): void {
    const group = this.buckets[kind];
    group.perSecond.remaining = 0;
    group.perHour.remaining = 0;
    group.perSecond.reset = reset * 1000;
    group.perHour.reset = reset * 1000;
  }

  private refill(group: RateLimitGroup): void {
    const now = Date.now();
    if (now >= group.perSecond.reset) {
      group.perSecond.remaining = group.perSecond.capacity;
      group.perSecond.reset = now + group.perSecond.refillInterval;
    }
    if (now >= group.perHour.reset) {
      group.perHour.remaining = group.perHour.capacity;
      group.perHour.reset = now + group.perHour.refillInterval;
    }
  }
}
