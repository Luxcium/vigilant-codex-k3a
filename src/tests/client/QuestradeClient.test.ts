import { describe, expect, it, vi } from 'vitest';
import { QuestradeClient } from '../../infra/client/QuestradeClient';
import { OAuthProvider, TokenStore } from '../../infra/auth/interfaces';

// Mock the RestClient
vi.mock('../../infra/http/restClient', () => ({
  RestClient: vi.fn().mockImplementation(() => ({
    get: vi.fn().mockResolvedValue({ time: 1234567890000 }),
  })),
}));

// Mock the AuthManager
vi.mock('../../infra/auth/manager', () => ({
  AuthManager: vi.fn().mockImplementation(() => ({
    getApiServer: vi.fn().mockResolvedValue('https://api.questrade.com'),
  })),
}));

describe('QuestradeClient', () => {
  const mockProvider: OAuthProvider = {
    authorizeUrl: () => 'https://login.example.com',
    exchangeCode: async () => ({
      access_token: 'access',
      refresh_token: 'refresh',
      api_server: 'https://api.example.com',
      expires_in: 3600,
      expiresAt: Date.now() + 3600000,
    }),
    refreshToken: async () => ({
      access_token: 'new_access',
      refresh_token: 'new_refresh',
      api_server: 'https://api.example.com',
      expires_in: 3600,
      expiresAt: Date.now() + 3600000,
    }),
  };

  const mockStore: TokenStore = {
    load: async () => null,
    save: async () => {
      // Mock save implementation
    },
    clear: async () => {
      // Mock clear implementation
    },
  };

  it('throws error when no provider is provided', () => {
    expect(
      () =>
        new QuestradeClient({
          clientId: 'test-client',
        })
    ).toThrow('OAuth provider required');
  });

  it('creates client with provider and default token store', () => {
    const client = new QuestradeClient({
      clientId: 'test-client',
      provider: mockProvider,
    });
    expect(client).toBeInstanceOf(QuestradeClient);
  });

  it('creates client with partial provider options', () => {
    const client = new QuestradeClient({
      clientId: 'test-client',
      provider: mockProvider,
      // This will use the default tokenStore implementation (line 20)
    });
    expect(client).toBeInstanceOf(QuestradeClient);
  });

  it('creates client with custom token store', () => {
    const client = new QuestradeClient({
      clientId: 'test-client',
      provider: mockProvider,
      tokenStore: mockStore,
    });
    expect(client).toBeInstanceOf(QuestradeClient);
  });

  it('time method returns a Date object', async () => {
    const client = new QuestradeClient({
      clientId: 'test-client',
      provider: mockProvider,
      apiServer: 'https://api.example.com',
    });

    const time = await client.time();
    expect(time).toBeInstanceOf(Date);
    expect(time.getTime()).toBe(1234567890000);
  });

  it('time method uses auth manager to get api server when not provided', async () => {
    const client = new QuestradeClient({
      clientId: 'test-client',
      provider: mockProvider,
      // No apiServer provided
    });

    const time = await client.time();
    expect(time).toBeInstanceOf(Date);
  });
});
