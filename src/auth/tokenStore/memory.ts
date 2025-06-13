import { OAuthTokens, TokenStore } from '../interfaces';

export class MemoryStore implements TokenStore {
  private tokens: OAuthTokens | null = null;

  async load(): Promise<OAuthTokens | null> {
    return this.tokens;
  }

  async save(t: OAuthTokens): Promise<void> {
    this.tokens = t;
  }

  async clear(): Promise<void> {
    this.tokens = null;
  }
}
