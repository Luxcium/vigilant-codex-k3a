import { describe, expect, it, vi } from 'vitest';
import * as manual from '../infra/auth/manual';
import { scheduleAutoRefresh } from '../infra/auth/scheduler';

vi.mock('../infra/auth/manual', () => ({
  bootstrap: vi.fn(async () => ({
    accessToken: 'a',
    apiServer: 's',
    refreshToken: 'r',
    expiresAt: Date.now() + 70_000,
  })),
}));

describe('scheduleAutoRefresh', () => {
  it('calls bootstrap and schedules next refresh', () => {
    vi.useFakeTimers();
    scheduleAutoRefresh('c', 'r');
    vi.advanceTimersByTime(500);
    expect(manual.bootstrap).toHaveBeenCalled();
  });
});
