import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { APP } from '../config';

export interface Token {
  access: string;
  refresh: string;
}

export class KeyManager {
  private path = join(APP.keyDir, 'oauth.json');

  async ensureDir() {
    await mkdir(APP.keyDir, { recursive: true });
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
}
