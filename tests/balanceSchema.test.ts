import { BalanceSchema } from '../src/types/accounts';

describe('BalanceSchema', () => {
  it('accepts a valid Balance', () => {
    const input = {
      currency: 'USD',
      cash: 100,
      marketValue: 150,
      totalEquity: 250,
      buyingPower: 200,
      maintenanceExcess: 50,
      isRealTime: true
    };
    const result = BalanceSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const { success, error } = BalanceSchema.safeParse({ currency: 'USD' });
    expect(success).toBe(false);
    expect(error?.issues.some(i => i.path.includes('cash'))).toBe(true);
  });
});
