import { describe, expect, it } from 'vitest';
import { AccountActivitySchema } from '../types/accounts';

describe('AccountActivitySchema', () => {
  it('accepts a valid AccountActivity', () => {
    const input = {
      tradeDate: '2024-01-01',
      transactionDate: '2024-01-02',
      settlementDate: '2024-01-03',
      action: 'Buy',
      symbol: 'AAPL',
      symbolId: 1,
      description: 'desc',
      currency: 'USD',
      quantity: 1,
      price: 100,
      grossAmount: 100,
      commission: 1,
      netAmount: 99,
      type: 'Order',
    };
    const result = AccountActivitySchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const { success, error } = AccountActivitySchema.safeParse({
      tradeDate: '2024-01-01',
    });
    expect(success).toBe(false);
    expect(
      error?.issues.some((i: any) => i.path.includes('transactionDate'))
    ).toBe(true);
  });
});
