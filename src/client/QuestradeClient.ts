import { OAuthProvider, TokenStore, OAuthTokens } from '../auth/interfaces';
import { AuthManager } from '../auth/manager';
import { RestClient } from '../http/restClient';
import { Candle } from '../types/markets';

export interface QuestradeClientOptions {
  clientId: string;
  refreshToken?: string;
  apiServer?: string;
  tokenStore?: TokenStore;
  scopes?: string[];
  provider?: OAuthProvider;
}

export class QuestradeClient {
  private auth: AuthManager;
  private rest?: RestClient;

  constructor(private readonly opts: QuestradeClientOptions) {
    if (!opts.provider) throw new Error('OAuth provider required');
    // Use provided tokenStore or in-memory fallback
    let memoryTokens: OAuthTokens | null = null;
    const store: TokenStore = opts.tokenStore ?? {
      load: async (): Promise<OAuthTokens | null> => memoryTokens,
      save: async (t: OAuthTokens): Promise<void> => {
        memoryTokens = t;
      },
      clear: async (): Promise<void> => {
        memoryTokens = null;
      },
    };
    this.auth = new AuthManager(opts.provider, store);
  }

  private async client(): Promise<RestClient> {
    if (!this.rest) {
      const base = this.opts.apiServer ?? (await this.auth.getApiServer());
      this.rest = new RestClient(base, this.auth);
    }
    return this.rest;
  }

  /**
   * Fetch historical candle data for a symbol.
   * @param symbolId - The instrument symbol ID.
   * @param start - ISO string for start time, e.g. '2024-10-01T00:00:00-04:00'.
   * @param end - ISO string for end time.
   * @param interval - Candle interval (e.g. 'OneDay').
   * @returns Array of candle records.
   */
  public async getCandles(
    symbolId: number,
    start: string,
    end: string,
    interval: string
  ): Promise<any[]> {
    // build query string
    const qs = new URLSearchParams({
      symbolId: symbolId.toString(),
      start,
      end,
      interval,
    });
    // perform GET request
    const result = await (
      await this.client()
    ).get<{ candles: any[] }>(`/markets/candles?${qs.toString()}`);
    return result.candles;
  }

  public async time(): Promise<Date> {
    // Explicit return type for constructor is not needed, but for clarity:
    // constructor(opts: QuestradeClientOptions)
    const client = await this.client();
    const res = await client.get<{ time: number }>('/time');
    return new Date(res.time);
  }
}
