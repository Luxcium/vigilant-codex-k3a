import { describe, it, expect, vi } from 'vitest'
import { scheduleAutoRefresh } from '../src/auth/scheduler'
import * as manual from '../src/auth/manual'

vi.mock('../src/auth/manual', () => ({
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
