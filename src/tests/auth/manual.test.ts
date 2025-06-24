import { bootstrap } from '@/auth/manual';
import * as storage from '@/auth/storage';
import { afterEach, beforeEach, describe, expect, it, vi, type MockedFunction } from 'vitest';

// Mock the storage module
vi.mock('@/auth/storage');

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('auth/manual', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('bootstrap', () => {
    const clientId = 'test-client-id';
    const refreshToken = 'test-refresh-token';
    const mockApiResponse = {
      access_token: 'new-access-token',
      api_server: 'https://api.example.com',
      expires_in: 3600,
      refresh_token: 'new-refresh-token',
    };

    it('should exchange refresh token for access tokens', async () => {
      // Setup mocks
      const mockResponse = {
        json: vi.fn().mockResolvedValue(mockApiResponse),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse);
      (storage.save as MockedFunction<typeof storage.save>).mockResolvedValue();

      // Execute
      const result = await bootstrap(clientId, refreshToken);

      // Verify fetch call
      expect(mockFetch).toHaveBeenCalledWith(
        'https://login.questrade.com/oauth2/token',
        {
          method: 'POST',
          body: expect.any(URLSearchParams),
        }
      );

      // Verify URLSearchParams content
      const fetchCall = mockFetch.mock.calls[0];
      const body = fetchCall[1].body as URLSearchParams;
      expect(body.get('grant_type')).toBe('refresh_token');
      expect(body.get('refresh_token')).toBe(refreshToken);

      // Verify result structure
      expect(result).toEqual({
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        expires_in: 3600,
        api_server: 'https://api.example.com',
        expiresAt: Date.now() + 3600000,
      });

      // Verify storage save call
      expect(storage.save).toHaveBeenCalledWith(
        `.keys/qs-tokens.${clientId}.json`,
        {
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token',
          apiServer: 'https://api.example.com',
          expiresAt: Date.now() + 3600000,
        }
      );
    });

    it('should use original refresh token when none returned from API', async () => {
      const responseWithoutRefresh = {
        access_token: 'new-access-token',
        api_server: 'https://api.example.com',
        expires_in: 3600,
        // No refresh_token property
      };

      const mockResponse = {
        json: vi.fn().mockResolvedValue(responseWithoutRefresh),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse);
      (storage.save as MockedFunction<typeof storage.save>).mockResolvedValue();

      const result = await bootstrap(clientId, refreshToken);

      expect(result.refresh_token).toBe(refreshToken);
      expect(storage.save).toHaveBeenCalledWith(
        `.keys/qs-tokens.${clientId}.json`,
        expect.objectContaining({
          refreshToken: refreshToken,
        })
      );
    });

    it('should handle fetch errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(bootstrap(clientId, refreshToken)).rejects.toThrow('Network error');
      expect(storage.save).not.toHaveBeenCalled();
    });

    it('should handle JSON parsing errors', async () => {
      const mockResponse = {
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(bootstrap(clientId, refreshToken)).rejects.toThrow('Invalid JSON');
      expect(storage.save).not.toHaveBeenCalled();
    });

    it('should handle storage save errors', async () => {
      const mockResponse = {
        json: vi.fn().mockResolvedValue(mockApiResponse),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse);
      (storage.save as MockedFunction<typeof storage.save>).mockRejectedValue(new Error('Storage error'));

      await expect(bootstrap(clientId, refreshToken)).rejects.toThrow('Storage error');
    });

    it('should calculate correct expiration time', async () => {
      const currentTime = Date.now();
      const expiresIn = 7200; // 2 hours
      const responseWithLongerExpiry = {
        ...mockApiResponse,
        expires_in: expiresIn,
      };

      const mockResponse = {
        json: vi.fn().mockResolvedValue(responseWithLongerExpiry),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse);
      (storage.save as MockedFunction<typeof storage.save>).mockResolvedValue();

      const result = await bootstrap(clientId, refreshToken);

      expect(result.expiresAt).toBe(currentTime + expiresIn * 1000);
    });

    it('should handle empty refresh token gracefully', async () => {
      const responseWithEmptyRefresh = {
        access_token: 'new-access-token',
        api_server: 'https://api.example.com',
        expires_in: 3600,
        refresh_token: '',
      };

      const mockResponse = {
        json: vi.fn().mockResolvedValue(responseWithEmptyRefresh),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse);
      (storage.save as MockedFunction<typeof storage.save>).mockResolvedValue();

      const result = await bootstrap(clientId, refreshToken);

      // Should use original refresh token when API returns empty string
      expect(result.refresh_token).toBe(refreshToken);
    });
  });
});
