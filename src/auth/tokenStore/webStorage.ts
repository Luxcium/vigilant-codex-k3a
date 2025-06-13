import { OAuthTokens, TokenStore } from '../interfaces';

export class WebStorageStore implements TokenStore {
  constructor(private readonly key = 'qt_tokens') {}

  async load(): Promise<OAuthTokens | null> {
    if (typeof window === 'undefined') return null;
    const val = window.localStorage.getItem(this.key);
    return val ? (JSON.parse(val) as OAuthTokens) : null;
  }

  async save(t: OAuthTokens): Promise<void> {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.key, JSON.stringify(t));
    }
  }

  async clear(): Promise<void> {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(this.key);
    }
  }
}
