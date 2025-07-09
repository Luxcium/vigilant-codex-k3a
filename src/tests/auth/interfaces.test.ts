import { describe, expect, it } from 'vitest';
import {
  OAuthProvider,
  OAuthTokenResponse,
  OAuthTokens,
  TokenStore,
} from '../../auth/interfaces';

describe('OAuthTokens', () => {
  it('should have the correct structure', () => {
    const tokens: OAuthTokens = {
      access_token: 'test_access_token',
      refresh_token: 'test_refresh_token',
      expires_in: 3600,
      api_server: 'https://api.example.com',
      expiresAt: Date.now() + 3600 * 1000,
    };

    expect(tokens.access_token).toBe('test_access_token');
    expect(tokens.refresh_token).toBe('test_refresh_token');
    expect(tokens.expires_in).toBe(3600);
    expect(tokens.api_server).toBe('https://api.example.com');
    expect(typeof tokens.expiresAt).toBe('number');
  });

  it('should allow numeric expires_in', () => {
    const tokens: OAuthTokens = {
      access_token: 'test',
      refresh_token: 'test',
      expires_in: 7200,
      api_server: 'https://api.example.com',
      expiresAt: Date.now(),
    };

    expect(tokens.expires_in).toBe(7200);
  });
});

describe('OAuthTokenResponse', () => {
  it('should have the correct structure with required fields', () => {
    const response: OAuthTokenResponse = {
      access_token: 'test_access_token',
      expires_in: 3600,
      api_server: 'https://api.example.com',
    };

    expect(response.access_token).toBe('test_access_token');
    expect(response.expires_in).toBe(3600);
    expect(response.api_server).toBe('https://api.example.com');
    expect(response.refresh_token).toBeUndefined();
  });

  it('should allow optional refresh_token', () => {
    const response: OAuthTokenResponse = {
      access_token: 'test_access_token',
      refresh_token: 'test_refresh_token',
      expires_in: 3600,
      api_server: 'https://api.example.com',
    };

    expect(response.refresh_token).toBe('test_refresh_token');
  });
});

describe('OAuthProvider interface', () => {
  it('should define the correct method signatures', () => {
    // This is a compile-time test to ensure the interface is properly defined
    const mockProvider: OAuthProvider = {
      authorizeUrl: (scopes: string[], state: string): string => {
        expect(Array.isArray(scopes)).toBe(true);
        expect(typeof state).toBe('string');
        return 'https://auth.example.com';
      },

      exchangeCode: async (code: string): Promise<OAuthTokens> => {
        expect(typeof code).toBe('string');
        return {
          access_token: 'test',
          refresh_token: 'test',
          expires_in: 3600,
          api_server: 'https://api.example.com',
          expiresAt: Date.now(),
        };
      },

      refreshToken: async (refresh: string): Promise<OAuthTokens> => {
        expect(typeof refresh).toBe('string');
        return {
          access_token: 'new_test',
          refresh_token: 'new_refresh',
          expires_in: 3600,
          api_server: 'https://api.example.com',
          expiresAt: Date.now(),
        };
      },

      revokeToken: async (token: string): Promise<void> => {
        expect(typeof token).toBe('string');
        return;
      },
    };

    expect(typeof mockProvider.authorizeUrl).toBe('function');
    expect(typeof mockProvider.exchangeCode).toBe('function');
    expect(typeof mockProvider.refreshToken).toBe('function');
    expect(typeof mockProvider.revokeToken).toBe('function');
  });
});

describe('TokenStore interface', () => {
  it('should define the correct method signatures', () => {
    // This is a compile-time test to ensure the interface is properly defined
    const mockStore: TokenStore = {
      load: async (): Promise<OAuthTokens | null> => {
        return {
          access_token: 'test',
          refresh_token: 'test',
          expires_in: 3600,
          api_server: 'https://api.example.com',
          expiresAt: Date.now(),
        };
      },

      save: async (t: OAuthTokens): Promise<void> => {
        expect(typeof t.access_token).toBe('string');
        expect(typeof t.refresh_token).toBe('string');
        expect(typeof t.expires_in).toBe('number');
        expect(typeof t.api_server).toBe('string');
        expect(typeof t.expiresAt).toBe('number');
        return;
      },

      clear: async (): Promise<void> => {
        return;
      },
    };

    expect(typeof mockStore.load).toBe('function');
    expect(typeof mockStore.save).toBe('function');
    expect(typeof mockStore.clear).toBe('function');
  });
});
