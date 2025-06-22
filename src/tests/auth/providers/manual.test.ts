import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ManualProvider } from '../../../auth/providers/manual';

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('ManualProvider', () => {
  let provider: ManualProvider;

  beforeEach(() => {
    provider = new ManualProvider('test-client-id');
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a ManualProvider instance', () => {
      expect(provider).toBeInstanceOf(ManualProvider);
    });
  });

  describe('authorizeUrl', () => {
    it('should throw an error as manual provider does not support authorization URL', () => {
      expect(() => provider.authorizeUrl(['read'], 'state')).toThrow(
        'Manual provider does not support authorization URL'
      );
    });
  });

  describe('exchangeCode', () => {
    it('should throw an error as manual provider does not exchange authorization codes', async () => {
      await expect(provider.exchangeCode('test-code')).rejects.toThrow(
        'Manual provider does not exchange authorization codes'
      );
    });
  });

  describe('refreshToken', () => {
    it('should successfully refresh token', async () => {
      const mockResponse = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        expires_in: 3600,
        api_server: 'https://api.questrade.com'
      };

      mockFetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse)
      });

      const result = await provider.refreshToken('old-refresh-token');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://login.questrade.com/oauth2/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'grant_type=refresh_token&refresh_token=old-refresh-token&client_id=test-client-id'
        }
      );

      expect(result).toEqual({
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        expires_in: 3600,
        api_server: 'https://api.questrade.com',
        expiresAt: expect.any(Number)
      });

      // Verify expiresAt is calculated correctly (within 1 second tolerance)
      const expectedExpiresAt = Date.now() + 3600 * 1000;
      expect(Math.abs(result.expiresAt - expectedExpiresAt)).toBeLessThan(1000);
    });

    it('should use fallback refresh token when server does not return one', async () => {
      const mockResponse = {
        access_token: 'new-access-token',
        expires_in: 3600,
        api_server: 'https://api.questrade.com'
        // No refresh_token in response
      };

      mockFetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse)
      });

      const result = await provider.refreshToken('fallback-refresh-token');

      expect(result.refresh_token).toBe('fallback-refresh-token');
    });

    it('should handle server response with null/undefined refresh_token', async () => {
      const mockResponse = {
        access_token: 'new-access-token',
        refresh_token: null,
        expires_in: 3600,
        api_server: 'https://api.questrade.com'
      };

      mockFetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse)
      });

      const result = await provider.refreshToken('fallback-refresh-token');

      expect(result.refresh_token).toBe('fallback-refresh-token');
    });

    it('should propagate fetch errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(provider.refreshToken('refresh-token')).rejects.toThrow(
        'Network error'
      );
    });

    it('should propagate JSON parsing errors', async () => {
      mockFetch.mockResolvedValueOnce({
        json: vi.fn().mockRejectedValueOnce(new Error('Invalid JSON'))
      });

      await expect(provider.refreshToken('refresh-token')).rejects.toThrow(
        'Invalid JSON'
      );
    });
  });
});
