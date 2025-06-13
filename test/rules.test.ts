import { describe, it, expect } from 'vitest'
import { categorize } from '../src/rateLimit/rules'

describe('categorize', () => {
  it('returns market for market urls', () => {
    expect(categorize('markets/quotes')).toBe('market')
  })
  it('returns account otherwise', () => {
    expect(categorize('accounts/123')).toBe('account')
  })
})
