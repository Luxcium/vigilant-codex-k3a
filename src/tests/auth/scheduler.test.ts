import type { OAuthTokens } from '@/auth/interfaces';
import * as manual from '@/auth/manual';
import { scheduleAutoRefresh } from '@/auth/scheduler';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedFunction,
} from 'vitest';

// Mock the manual module
vi.mock('@/auth/manual');

describe('auth/scheduler', () => {
  const clientId = 'test-client-id';
  const refreshToken = 'test-refresh-token';

  let mockBootstrap: MockedFunction<typeof manual.bootstrap>;
  let timeoutSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    mockBootstrap = manual.bootstrap as MockedFunction<typeof manual.bootstrap>;
    timeoutSpy = vi.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  const createMockTokens = (expiresInMs: number): OAuthTokens => ({
    access_token: 'test-access-token',
    refresh_token: 'test-refresh-token',
    expires_in: 3600,
    api_server: 'https://api.example.com',
    expiresAt: Date.now() + expiresInMs,
  });

  describe('scheduleAutoRefresh', () => {
    it('should start the scheduler immediately', () => {
      const mockTokens = createMockTokens(300000);
      mockBootstrap.mockResolvedValue(mockTokens);

      scheduleAutoRefresh(clientId, refreshToken);

      // Bootstrap should be called immediately
      expect(mockBootstrap).toHaveBeenCalledWith(clientId, refreshToken);
    });

    it('should return void', () => {
      const mockTokens = createMockTokens(300000);
      mockBootstrap.mockResolvedValue(mockTokens);

      const result = scheduleAutoRefresh(clientId, refreshToken);
      expect(result).toBeUndefined();
    });

    it('should handle multiple scheduler instances', () => {
      const mockTokens = createMockTokens(300000);
      mockBootstrap.mockResolvedValue(mockTokens);

      scheduleAutoRefresh(clientId, refreshToken);
      scheduleAutoRefresh('client2', 'token2');

      expect(mockBootstrap).toHaveBeenCalledTimes(2);
      expect(mockBootstrap).toHaveBeenNthCalledWith(1, clientId, refreshToken);
      expect(mockBootstrap).toHaveBeenNthCalledWith(2, 'client2', 'token2');
    });

    it('should not throw when bootstrap fails', () => {
      mockBootstrap.mockRejectedValue(new Error('Network error'));

      expect(() => scheduleAutoRefresh(clientId, refreshToken)).not.toThrow();
      expect(mockBootstrap).toHaveBeenCalledWith(clientId, refreshToken);
    });
  });

  describe('delay calculation behavior', () => {
    it('should schedule timeout with correct delay for normal expiration', async () => {
      const mockTokens = createMockTokens(300000); // 5 minutes
      mockBootstrap.mockResolvedValue(mockTokens);

      scheduleAutoRefresh(clientId, refreshToken);

      // Wait for bootstrap to complete
      await vi.waitFor(() => {
        return timeoutSpy.mock.calls.length > 0;
      });

      expect(timeoutSpy).toHaveBeenCalled();
      const delay = timeoutSpy.mock.calls[0][1];

      // Should be approximately 240000ms (5 minutes - 1 minute buffer)
      expect(delay).toBeGreaterThan(230000);
      expect(delay).toBeLessThan(250000);
    });

    it('should use minimum delay for short expiration', async () => {
      const mockTokens = createMockTokens(30000); // 30 seconds
      mockBootstrap.mockResolvedValue(mockTokens);

      scheduleAutoRefresh(clientId, refreshToken);

      await vi.waitFor(() => {
        return timeoutSpy.mock.calls.length > 0;
      });

      const delay = timeoutSpy.mock.calls[0][1];
      expect(delay).toBe(15000);
    });

    it('should use minimum delay for expired tokens', async () => {
      const mockTokens = createMockTokens(-10000); // Already expired
      mockBootstrap.mockResolvedValue(mockTokens);

      scheduleAutoRefresh(clientId, refreshToken);

      await vi.waitFor(() => {
        return timeoutSpy.mock.calls.length > 0;
      });

      const delay = timeoutSpy.mock.calls[0][1];
      expect(delay).toBe(15000);
    });
  });

  describe('error handling', () => {
    it('should schedule retry with minimum delay on bootstrap error', async () => {
      mockBootstrap.mockRejectedValue(new Error('Network error'));

      scheduleAutoRefresh(clientId, refreshToken);

      await vi.waitFor(() => {
        return timeoutSpy.mock.calls.length > 0;
      });

      const delay = timeoutSpy.mock.calls[0][1];
      expect(delay).toBe(15000);
    });

    it('should continue after error recovery', async () => {
      const mockTokens = createMockTokens(300000);

      // First call fails, second succeeds
      mockBootstrap
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockTokens);

      scheduleAutoRefresh(clientId, refreshToken);

      // Wait for first timeout (error case)
      await vi.waitFor(() => {
        return timeoutSpy.mock.calls.length >= 1;
      });

      expect(timeoutSpy.mock.calls[0][1]).toBe(15000);

      // Advance timers to trigger retry
      await vi.advanceTimersByTimeAsync(15000);

      // Wait for second timeout (success case)
      await vi.waitFor(() => {
        return timeoutSpy.mock.calls.length >= 2;
      });

      const secondDelay = timeoutSpy.mock.calls[1][1];
      expect(secondDelay).toBeGreaterThan(200000); // More generous range
      expect(secondDelay).toBeLessThan(300000);
    });
  });
});
