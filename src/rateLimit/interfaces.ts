export type BucketKind = 'account' | 'market';

export interface RateLimitBucket {
  capacity: number;
  refillInterval: number; // ms
  remaining: number;
  reset: number; // epoch ms
}
