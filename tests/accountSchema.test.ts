import {
  AccountSchema,
  BalanceSchema,
  PositionSchema,
  ExecutionSchema,
  AccountActivitySchema
} from '../src/types/accounts';

describe('AccountSchema', () => {
  it('accepts a valid Account', () => {
    const input = {
      number: 'ABC12345',
      type: 'Cash',
      status: 'Active',
      isPrimary: true,
      isBilling: false,
      clientAccountType: 'Individual'
    };
    const result = AccountSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const { success, error } = AccountSchema.safeParse({ number: 'ABC12345' });
    expect(success).toBe(false);
    expect(error?.issues.some(i => i.path.includes('type'))).toBe(true);
  });
});

describe('BalanceSchema', () => {
  it('accepts a valid Balance', () => {
    const input = {
      currency: 'USD',
      cash: 100,
      marketValue: 200,
      totalEquity: 300,
      buyingPower: 150,
      maintenanceExcess: 80,
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
      isUnderReorg: false
    };
    const result = PositionSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const { success, error } = PositionSchema.safeParse({ symbolId: 1 });
    expect(success).toBe(false);
    expect(error?.issues.some(i => i.path.includes('symbol'))).toBe(true);
  });
});

describe('ExecutionSchema', () => {
  it('accepts a valid Execution', () => {
    const input = {
      symbol: 'AAPL',
      symbolId: 1,
      quantity: 1,
      side: 'Buy',
      price: 100,
      id: 1,
      orderId: 1,
      orderChainId: 1,
      exchangeExecId: 'ex1',
      timestamp: '2024-01-01',
      notes: '',
      venue: 'TSE',
      totalCost: 100,
      orderPlacementCommission: 1,
      commission: 1,
      executionFee: 1,
      secFee: 0,
      canadianExecutionFee: 0,
      parentId: 0
    };
    const result = ExecutionSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const { success, error } = ExecutionSchema.safeParse({ symbolId: 1 });
    expect(success).toBe(false);
    expect(error?.issues.some(i => i.path.includes('symbol'))).toBe(true);
  });
});

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
      type: 'trade'
    };
    const result = AccountActivitySchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const { success, error } = AccountActivitySchema.safeParse({ symbol: 'AAPL' });
    expect(success).toBe(false);
    expect(error?.issues.some(i => i.path.includes('tradeDate'))).toBe(true);
  });
});
