import { describe, expect, it } from 'vitest';
import { PositionSchema } from '../types/accounts';

describe('PositionSchema', () => {
  it('accepts a valid Position', () => {
    const input = {
      symbol: 'AAPL',
      symbolId: 1,
      openQuantity: 10,
      closedQuantity: 0,
      currentMarketValue: 1000,
      currentPrice: 100,
      averageEntryPrice: 90,
      closedPnl: 0,
      openPnl: 100,
      totalCost: 900,
      isRealTime: true,
      isUnderReorg: false,
    };
    const result = PositionSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const { success, error } = PositionSchema.safeParse({ symbol: 'AAPL' });
    expect(success).toBe(false);
    expect(error?.issues.some((i: any) => i.path.includes('symbolId'))).toBe(
      true
    );
  });
});
