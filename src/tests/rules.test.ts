import { describe, expect, it } from 'vitest';
import { categorize } from '../rateLimit/rules';

describe('categorize', () => {
  it('returns market for market urls', () => {
    expect(categorize('markets/quotes')).toBe('market');
  });
  it('returns account otherwise', () => {
    expect(categorize('accounts/123')).toBe('account');
  });
});
