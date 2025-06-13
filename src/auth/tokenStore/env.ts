import { OAuthTokens, TokenStore } from '../interfaces';

const KEY = 'QT_TOKENS';

export class EnvStore implements TokenStore {
  constructor(private readonly varName: string = KEY) {}

  async load(): Promise<OAuthTokens | null> {
    const val = process.env[this.varName];
    return val ? (JSON.parse(val) as OAuthTokens) : null;
  }

  async save(t: OAuthTokens): Promise<void> {
    process.env[this.varName] = JSON.stringify(t);
  }

  async clear(): Promise<void> {
    delete process.env[this.varName];
  }
}
