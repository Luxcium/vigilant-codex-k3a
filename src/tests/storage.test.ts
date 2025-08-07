import { afterEach, describe, expect, it } from 'vitest';
import { clear, load, OAuthTokens, save } from '../infra/auth/storage';

const file = '.keys/test.json';
const tokens: OAuthTokens = {
  accessToken: 'a',
  apiServer: 's',
  refreshToken: 'r',
  expiresAt: 0,
};

describe('storage', () => {
  afterEach(async () => {
    await clear(file);
  });

  it('save and load tokens', async () => {
    await save(file, tokens);
    const loaded = await load(file);
    expect(loaded).toEqual(tokens);
  });

  it('returns null when file missing', async () => {
    const loaded = await load('missing.json');
    expect(loaded).toBeNull();
  });
});
