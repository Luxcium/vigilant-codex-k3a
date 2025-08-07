import { describe, expect, it, beforeEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import { dirname } from 'path';
import { FileStore } from '../../../infra/auth/tokenStore/file';
import type { OAuthTokens } from '../../../infra/auth/interfaces';

describe('FileStore', () => {
  const filePath = '/tmp/test_qt_tokens.json';
  const store = new FileStore(filePath);
  const sample: OAuthTokens = {
    access_token: 'a',
    refresh_token: 'r',
    expires_in: 3600,
    api_server: 'https://api',
    expiresAt: Date.now() + 3600_000,
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with default path', () => {
    const defaultStore = new FileStore();
    expect(defaultStore).toBeInstanceOf(FileStore);
  });

  it('returns null when load fails', async () => {
    vi.spyOn(fs, 'readFile').mockRejectedValueOnce(new Error('fail'));
    await expect(store.load()).resolves.toBeNull();
  });

  it('loads and parses tokens', async () => {
    vi.spyOn(fs, 'readFile').mockResolvedValueOnce(JSON.stringify(sample));
    const loaded = await store.load();
    expect(loaded).toEqual(sample);
  });

  it('saves tokens to file after ensuring directory', async () => {
    const mkdirSpy = vi.spyOn(fs, 'mkdir').mockResolvedValueOnce();
    const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValueOnce();
    await store.save(sample);
    expect(mkdirSpy).toHaveBeenCalledWith(dirname(filePath), {
      recursive: true,
    });
    expect(writeSpy).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(sample, null, 2)
    );
  });

  it('clears tokens by deleting file', async () => {
    const rmSpy = vi.spyOn(fs, 'rm').mockResolvedValueOnce();
    await store.clear();
    expect(rmSpy).toHaveBeenCalledWith(filePath, { force: true });
  });
});
