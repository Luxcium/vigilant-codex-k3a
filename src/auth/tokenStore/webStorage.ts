import { OAuthTokens, TokenStore } from '../interfaces';

// Browser environment interface
interface WindowWithLocalStorage {
  localStorage: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  };
}

export class WebStorageStore implements TokenStore {
  constructor(private readonly key = 'qt_tokens') {}

  async load(): Promise<OAuthTokens | null> {
    if (typeof globalThis === 'undefined' || !this.hasLocalStorage()) return null;
    const window = globalThis as unknown as WindowWithLocalStorage;
    const val = window.localStorage.getItem(this.key);
    return val ? (JSON.parse(val) as OAuthTokens) : null;
  }

  async save(t: OAuthTokens): Promise<void> {
    if (this.hasLocalStorage()) {
      const window = globalThis as unknown as WindowWithLocalStorage;
      window.localStorage.setItem(this.key, JSON.stringify(t));
    }
  }

  async clear(): Promise<void> {
    if (this.hasLocalStorage()) {
      const window = globalThis as unknown as WindowWithLocalStorage;
      window.localStorage.removeItem(this.key);
    }
  }

  private hasLocalStorage(): boolean {
    return typeof globalThis !== 'undefined' && 
           'localStorage' in globalThis && 
           globalThis.localStorage !== null;
  }
}
