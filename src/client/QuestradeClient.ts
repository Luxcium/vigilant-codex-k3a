import { OAuthProvider, TokenStore } from '../auth/interfaces';
import { AuthManager } from '../auth/manager';
import { RestClient } from '../http/restClient';

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
    const store = opts.tokenStore ?? {
      load: async (): Promise<null> => null,
      save: async (): Promise<void> => {},
      clear: async (): Promise<void> => {},
    };
    if (!opts.provider) throw new Error('OAuth provider required');
    this.auth = new AuthManager(opts.provider, store);
  }

  private async client(): Promise<RestClient> {
    if (!this.rest) {
      const base = this.opts.apiServer ?? (await this.auth.getApiServer());
      this.rest = new RestClient(base, this.auth);
    }
    return this.rest;
  }

  public async time(): Promise<Date> {
    // Explicit return type for constructor is not needed, but for clarity:
    // constructor(opts: QuestradeClientOptions)
    const client = await this.client();
    const res = await client.get<{ time: number }>('/time');
    return new Date(res.time);
  }
}
