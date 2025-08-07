import { OAuthProvider, OAuthTokens, TokenStore } from '@/infra/auth/interfaces';
import { AuthManager } from '@/infra/auth/manager';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedFunction,
} from 'vitest';

describe('AuthManager', () => {
  let mockProvider: OAuthProvider;
  let mockStore: TokenStore;
  let authManager: AuthManager;
  let mockTokens: OAuthTokens;

  beforeEach(() => {
    // Mock current time for consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-01T00:00:00Z'));

    mockTokens = {
      access_token: 'access-token-123',
      refresh_token: 'refresh-token-456',
      expires_in: 3600,
      api_server: 'https://api.example.com',
      expiresAt: Date.now() + 3600000, // 1 hour from now
    };

    mockProvider = {
      authorizeUrl: vi.fn(),
      exchangeCode: vi.fn(),
      refreshToken: vi.fn(),
      revokeToken: vi.fn(),
    } as OAuthProvider;

    mockStore = {
      load: vi.fn(),
      save: vi.fn(),
      clear: vi.fn(),
    } as TokenStore;

    authManager = new AuthManager(mockProvider, mockStore);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('constructor', () => {
    it('should create an instance with provider and store', () => {
      expect(authManager).toBeInstanceOf(AuthManager);
      expect(authManager).toBeDefined();
    });
  });

  describe('getAccessToken', () => {
    it('should return access token when valid tokens exist', async () => {
      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(mockTokens);

      const accessToken = await authManager.getAccessToken();

      expect(accessToken).toBe('access-token-123');
      expect(mockStore.load).toHaveBeenCalledTimes(1);
    });

    it('should throw error when no tokens are available', async () => {
      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(null);

      await expect(authManager.getAccessToken()).rejects.toThrow(
        'No tokens available'
      );
      expect(mockStore.load).toHaveBeenCalledTimes(1);
    });

    it('should refresh tokens when they are close to expiry', async () => {
      const expiredTokens = {
        ...mockTokens,
        expiresAt: Date.now() + 30000, // 30 seconds from now (less than 60s margin)
      };
      const refreshedTokens = {
        ...mockTokens,
        access_token: 'new-access-token',
        expiresAt: Date.now() + 3600000,
      };

      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(expiredTokens);
      (
        mockProvider.refreshToken as MockedFunction<
          typeof mockProvider.refreshToken
        >
      ).mockResolvedValue(refreshedTokens);

      const accessToken = await authManager.getAccessToken();

      expect(accessToken).toBe('new-access-token');
      expect(mockProvider.refreshToken).toHaveBeenCalledWith(
        'refresh-token-456'
      );
      expect(mockStore.save).toHaveBeenCalledWith(refreshedTokens);
    });

    it('should handle concurrent refresh requests', async () => {
      const expiredTokens = {
        ...mockTokens,
        expiresAt: Date.now() + 30000,
      };
      const refreshedTokens = {
        ...mockTokens,
        access_token: 'new-access-token',
      };

      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(expiredTokens);
      (
        mockProvider.refreshToken as MockedFunction<
          typeof mockProvider.refreshToken
        >
      ).mockResolvedValue(refreshedTokens);

      // Make multiple concurrent requests
      const promises = [
        authManager.getAccessToken(),
        authManager.getAccessToken(),
        authManager.getAccessToken(),
      ];

      const results = await Promise.all(promises);

      // All should return the same refreshed token
      results.forEach(token => {
        expect(token).toBe('new-access-token');
      });

      // But refresh should only be called once
      expect(mockProvider.refreshToken).toHaveBeenCalledTimes(1);
    });
  });

  describe('getApiServer', () => {
    it('should return API server URL when valid tokens exist', async () => {
      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(mockTokens);

      const apiServer = await authManager.getApiServer();

      expect(apiServer).toBe('https://api.example.com');
      expect(mockStore.load).toHaveBeenCalledTimes(1);
    });

    it('should throw error when no tokens are available', async () => {
      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(null);

      await expect(authManager.getApiServer()).rejects.toThrow(
        'No tokens available'
      );
    });

    it('should refresh tokens and return API server when tokens are close to expiry', async () => {
      const expiredTokens = {
        ...mockTokens,
        expiresAt: Date.now() + 30000,
      };
      const refreshedTokens = {
        ...mockTokens,
        api_server: 'https://api-new.example.com',
      };

      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(expiredTokens);
      (
        mockProvider.refreshToken as MockedFunction<
          typeof mockProvider.refreshToken
        >
      ).mockResolvedValue(refreshedTokens);

      const apiServer = await authManager.getApiServer();

      expect(apiServer).toBe('https://api-new.example.com');
      expect(mockProvider.refreshToken).toHaveBeenCalledWith(
        'refresh-token-456'
      );
    });
  });

  describe('revokeAll', () => {
    it('should revoke tokens and clear store when tokens exist', async () => {
      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(mockTokens);
      const mockRevokeToken = vi.fn().mockResolvedValue(undefined);
      mockProvider.revokeToken = mockRevokeToken;

      // Load tokens first
      await authManager.getAccessToken();

      await authManager.revokeAll();

      expect(mockRevokeToken).toHaveBeenCalledWith('refresh-token-456');
      expect(mockStore.clear).toHaveBeenCalledTimes(1);
    });

    it('should clear store even when no revoke method is available', async () => {
      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(mockTokens);
      delete mockProvider.revokeToken;

      // Load tokens first
      await authManager.getAccessToken();

      await authManager.revokeAll();

      expect(mockStore.clear).toHaveBeenCalledTimes(1);
    });

    it('should clear store even when no tokens are loaded', async () => {
      await authManager.revokeAll();

      expect(mockStore.clear).toHaveBeenCalledTimes(1);
      expect(mockProvider.revokeToken).not.toHaveBeenCalled();
    });

    it('should handle revoke token errors gracefully', async () => {
      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(mockTokens);
      const mockRevokeToken = vi
        .fn()
        .mockRejectedValue(new Error('Revoke failed'));
      mockProvider.revokeToken = mockRevokeToken;

      // Load tokens first
      await authManager.getAccessToken();

      await expect(authManager.revokeAll()).rejects.toThrow('Revoke failed');
      expect(mockStore.clear).not.toHaveBeenCalled();
    });
  });

  describe('token refresh edge cases', () => {
    it('should handle refresh token failure', async () => {
      const expiredTokens = {
        ...mockTokens,
        expiresAt: Date.now() + 30000,
      };

      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(expiredTokens);
      (
        mockProvider.refreshToken as MockedFunction<
          typeof mockProvider.refreshToken
        >
      ).mockRejectedValue(new Error('Refresh failed'));

      await expect(authManager.getAccessToken()).rejects.toThrow(
        'Refresh failed'
      );
      expect(mockProvider.refreshToken).toHaveBeenCalledWith(
        'refresh-token-456'
      );
    });

    it('should handle store save failure during refresh', async () => {
      const expiredTokens = {
        ...mockTokens,
        expiresAt: Date.now() + 30000,
      };
      const refreshedTokens = {
        ...mockTokens,
        access_token: 'new-access-token',
      };

      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(expiredTokens);
      (
        mockProvider.refreshToken as MockedFunction<
          typeof mockProvider.refreshToken
        >
      ).mockResolvedValue(refreshedTokens);
      (
        mockStore.save as MockedFunction<typeof mockStore.save>
      ).mockRejectedValue(new Error('Save failed'));

      await expect(authManager.getAccessToken()).rejects.toThrow('Save failed');
      expect(mockProvider.refreshToken).toHaveBeenCalledWith(
        'refresh-token-456'
      );
      expect(mockStore.save).toHaveBeenCalledWith(refreshedTokens);
    });
  });

  describe('token validation', () => {
    it('should handle exactly at refresh margin boundary', async () => {
      const marginTokens = {
        ...mockTokens,
        expiresAt: Date.now() + 60000, // Exactly 60 seconds (refresh margin)
      };

      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(marginTokens);

      const accessToken = await authManager.getAccessToken();

      // Should return existing token without refresh
      expect(accessToken).toBe('access-token-123');
      expect(mockProvider.refreshToken).not.toHaveBeenCalled();
    });

    it('should refresh when one millisecond before margin', async () => {
      const almostExpiredTokens = {
        ...mockTokens,
        expiresAt: Date.now() + 59999, // 59.999 seconds
      };
      const refreshedTokens = {
        ...mockTokens,
        access_token: 'refreshed-token',
      };

      (
        mockStore.load as MockedFunction<typeof mockStore.load>
      ).mockResolvedValue(almostExpiredTokens);
      (
        mockProvider.refreshToken as MockedFunction<
          typeof mockProvider.refreshToken
        >
      ).mockResolvedValue(refreshedTokens);

      const accessToken = await authManager.getAccessToken();

      expect(accessToken).toBe('refreshed-token');
      expect(mockProvider.refreshToken).toHaveBeenCalledWith(
        'refresh-token-456'
      );
    });
  });
});
