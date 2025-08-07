import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { APP } from '../config';

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export class KeyManager {
  private path: string;

  constructor(private dir: string = APP.keyDir) {
    this.path = join(this.dir, 'oauth.json');
  }

  async ensureDir() {
    await mkdir(this.dir, { recursive: true });
  }

  async save(token: Token) {
    await this.ensureDir();
    await writeFile(this.path, JSON.stringify(token));
  }

  async load(): Promise<Token | undefined> {
    try {
      return JSON.parse(await readFile(this.path, 'utf8'));
    } catch {
      return undefined;
    }
  }

  /**
   * Clear saved tokens by removing the token file.
   */
  async clear(): Promise<void> {
    try {
      // remove token file if exists
      await import('node:fs/promises').then(fs =>
        fs.rm(this.path, { force: true })
      );
    } catch {
      // ignore errors
    }
  }
}
