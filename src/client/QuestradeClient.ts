import { AuthManager } from '../auth/manager';
import { OAuthProvider, TokenStore } from '../auth/interfaces';
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
    const store = opts.tokenStore ?? { load: async () => null, save: async () => {}, clear: async () => {} };
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

  async time(): Promise<Date> {
    const client = await this.client();
    const res = await client.get<{ time: number }>('/time');
    return new Date(res.time);
  }
}
