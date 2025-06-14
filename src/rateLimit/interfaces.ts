export type BucketKind = 'account' | 'market';

export interface TokenBucket {
  capacity: number;
  refillInterval: number; // ms
  remaining: number;
  reset: number; // epoch ms
}

export interface RateLimitGroup {
  perSecond: TokenBucket;
  perHour: TokenBucket;
}
