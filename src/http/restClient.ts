import { AuthManager } from '../auth/manager';
import { TokenBucketLimiter } from '../rateLimit/tokenBucket';
import { handleQuestradeError } from '../error';

export class RestClient {
  private limiter = new TokenBucketLimiter();

  constructor(private readonly baseUrl: string, private readonly auth: AuthManager) {
    if (!this.baseUrl.startsWith('https://')) throw new Error('Base URL must be HTTPS');
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const url = this.baseUrl + path;
    await this.limiter.consume('account');
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${await this.auth.getAccessToken()}`,
        ...(body ? { 'Content-Type': 'application/json' } : {})
      },
      body: body ? JSON.stringify(body) : undefined
    });
    this.limiter.hydrate('account', {
      'x-ratelimit-remaining': res.headers.get('x-ratelimit-remaining') ?? '',
      'x-ratelimit-reset': res.headers.get('x-ratelimit-reset') ?? '',
      'x-ratelimit-remaining-second': res.headers.get('x-ratelimit-remaining-second') ?? '',
      'x-ratelimit-reset-second': res.headers.get('x-ratelimit-reset-second') ?? '',
      'x-ratelimit-remaining-hour': res.headers.get('x-ratelimit-remaining-hour') ?? '',
      'x-ratelimit-reset-hour': res.headers.get('x-ratelimit-reset-hour') ?? ''
    });
    if (res.status === 429) {
      const reset = Number(res.headers.get('x-ratelimit-reset') ?? '0');
      if (!Number.isNaN(reset)) this.limiter.handle429('account', reset);
      throw new Error('Rate limit exceeded');
    }
    if (!res.ok) return handleQuestradeError(res);
    return res.json() as Promise<T>;
  }

  get<T>(path: string): Promise<T> {
    return this.request('GET', path);
  }

  post<T>(path: string, body: unknown): Promise<T> {
    return this.request('POST', path, body);
  }

  delete<T>(path: string): Promise<T> {
    return this.request('DELETE', path);
  }
}
