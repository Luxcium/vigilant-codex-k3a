import { createRateLimiter } from '../rateLimit/tokenBucket';
import { categorize } from '../rateLimit/rules';
import { bootstrap } from '../auth/manual';
import { toQuestradeError } from './toError';
import type { GeneralErrorPayload } from './types';

const rl = createRateLimiter();

/**
 * Wrap fetch with rate limiting, retry and auth refresh logic.
 */
export const smartFetch =
  (
    /* c8 ignore next */
    baseFetch: typeof fetch = fetch
  ) =>
  async (
    url: string,
    init: RequestInit & { clientId?: string; refreshToken?: string } = {}
  ): Promise<Response> => {
    const cat = categorize(url);
    await rl.acquire(cat);
    let res: Response = await baseFetch(url, init);
    const remaining = parseInt(
      res.headers.get('X-RateLimit-Remaining') ?? '',
      10
    );
    const reset = parseInt(res.headers.get('X-RateLimit-Reset') ?? '', 10);
    if (!Number.isNaN(remaining) && !Number.isNaN(reset)) {
      rl.sync(cat, remaining, reset);
    }
    if (res.status === 429) {
      const wait = Math.max(reset * 1_000 - Date.now(), 0);
      await new Promise(r => setTimeout(r, wait));
      return smartFetch(baseFetch)(url, init);
    }
    const clone = res.clone();
    const payload = (await clone
      .json()
      .catch(() => ({}))) as GeneralErrorPayload;
    if (
      (res.status === 401 || payload?.code === 1017) &&
      init.clientId &&
      init.refreshToken
    ) {
      await bootstrap(init.clientId, init.refreshToken);
      const { clientId, refreshToken, ...rest } = init;
      void clientId; // avoid unused variable warning
      void refreshToken; // avoid unused variable warning
      res = await baseFetch(url, rest);
    }
    if (!res.ok) throw await toQuestradeError(res);
    return res;
  };
