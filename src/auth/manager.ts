import { OAuthProvider, OAuthTokens, TokenStore } from './interfaces';

export class AuthManager {
  private tokens: OAuthTokens | null = null;
  private refreshing: Promise<OAuthTokens> | null = null;
  private readonly refreshMargin = 60_000; // 60s

  constructor(private readonly provider: OAuthProvider, private readonly store: TokenStore) {}

  private async ensure(): Promise<OAuthTokens | null> {
    if (!this.tokens) {
      this.tokens = await this.store.load();
    }
    if (!this.tokens) return null;

    const ttl = this.tokens.expiresAt - Date.now();
    if (ttl < this.refreshMargin) {
      return this.refresh();
    }
    return this.tokens;
  }

  private async refresh(): Promise<OAuthTokens> {
    if (!this.refreshing) {
      this.refreshing = this.provider.refreshToken(this.tokens!.refresh_token).then(async (t) => {
        this.tokens = t;
        await this.store.save(t);
        this.refreshing = null;
        return t;
      });
    }
    return this.refreshing;
  }

  async getAccessToken(): Promise<string> {
    const t = await this.ensure();
    if (!t) throw new Error('No tokens available');
    return t.access_token;
  }

  async getApiServer(): Promise<string> {
    const t = await this.ensure();
    if (!t) throw new Error('No tokens available');
    return t.api_server;
  }

  async revokeAll(): Promise<void> {
    if (this.tokens && this.provider.revokeToken) {
      await this.provider.revokeToken(this.tokens.refresh_token);
    }
    await this.store.clear();
    this.tokens = null;
  }
}
