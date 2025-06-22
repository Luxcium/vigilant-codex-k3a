import { describe, expect, it, vi } from 'vitest'
import * as manual from '../auth/manual'
import { scheduleAutoRefresh } from '../auth/scheduler'

vi.mock('../auth/manual', () => ({
  bootstrap: vi.fn(async () => ({ accessToken:'a', apiServer:'s', refreshToken:'r', expiresAt: Date.now() + 70_000 }))
}))

describe('scheduleAutoRefresh', () => {
  it('calls bootstrap and schedules next refresh', () => {
    vi.useFakeTimers()
    scheduleAutoRefresh('c','r')
    vi.advanceTimersByTime(500)
    expect(manual.bootstrap).toHaveBeenCalled()
  })
})
