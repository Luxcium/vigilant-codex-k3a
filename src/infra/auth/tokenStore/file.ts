import { promises as fs } from 'fs';
import { dirname } from 'path';
import { OAuthTokens, TokenStore } from '../interfaces';

const FILE = '.cache/qt_tokens.json';

const ensureDir = async (p: string): Promise<void> => {
  await fs.mkdir(dirname(p), { recursive: true });
};

export class FileStore implements TokenStore {
  constructor(private readonly path: string = FILE) {}

  async load(): Promise<OAuthTokens | null> {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return JSON.parse(data) as OAuthTokens;
    } catch {
      return null;
    }
  }

  async save(t: OAuthTokens): Promise<void> {
    await ensureDir(this.path);
    await fs.writeFile(this.path, JSON.stringify(t, null, 2));
  }

  async clear(): Promise<void> {
    await fs.rm(this.path, { force: true });
  }
}
