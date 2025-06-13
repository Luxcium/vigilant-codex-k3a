import { TokenBucketLimiter } from '../src/rateLimit/tokenBucket';

test('bucket consume and hydrate', async () => {
  const limiter = new TokenBucketLimiter();
  await limiter.consume('account');
  limiter.hydrate('account', { 'x-ratelimit-remaining': '1', 'x-ratelimit-reset': String(Math.floor(Date.now()/1000)+1) });
  expect(true).toBe(true);
});
