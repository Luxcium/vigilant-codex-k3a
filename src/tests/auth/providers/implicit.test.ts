import { describe, expect, it } from 'vitest';
import { ImplicitProvider } from '../../../auth/providers/implicit';

describe('ImplicitProvider', () => {
  const clientId = 'cid';
  const redirectUri = 'https://app/callback';
  const provider = new ImplicitProvider(clientId, redirectUri);

  it('builds correct authorize URL', () => {
    const url = provider.authorizeUrl(['a', 'b'], 'state123');
    expect(
      url.startsWith('https://login.questrade.com/oauth2/authorize?')
    ).toBe(true);
    expect(url).toContain('client_id=cid');
    expect(url).toContain('response_type=token');
    expect(url).toContain('redirect_uri=https%3A%2F%2Fapp%2Fcallback');
    expect(url).toContain('scope=a%2Cb');
    expect(url).toContain('state=state123');
  });

  it('exchangeCode throws error', async () => {
    await expect(provider.exchangeCode()).rejects.toThrow(
      'Implicit flow does not support code exchange'
    );
  });

  it('refreshToken throws error', async () => {
    await expect(provider.refreshToken()).rejects.toThrow(
      'Implicit flow cannot refresh tokens'
    );
  });
});
