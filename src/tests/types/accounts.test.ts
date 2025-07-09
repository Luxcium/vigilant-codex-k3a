import { describe, expect, it } from 'vitest';
import {
  AccountActivitySchema,
  AccountSchema,
  BalanceSchema,
  ExecutionSchema,
  PositionSchema,
} from '../../../src/types/accounts';

describe('Account related schemas', () => {
  it('valid AccountSchema parses correctly', () => {
    const obj = {
      number: 'ACC123',
      type: 'Cash',
      status: 'Active',
      isPrimary: true,
      isBilling: false,
      clientAccountType: 'Individual',
    };
    expect(AccountSchema.parse(obj)).toEqual(obj);
  });
  it('invalid AccountSchema throws', () => {
    expect(() => AccountSchema.parse({})).toThrow();
  });

  it('valid BalanceSchema parses correctly', () => {
    const obj = {
      currency: 'USD',
      cash: 100,
      marketValue: 200,
      totalEquity: 300,
      buyingPower: 400,
      maintenanceExcess: 50,
      isRealTime: false,
    };
    expect(BalanceSchema.parse(obj)).toEqual(obj);
  });
  it('invalid BalanceSchema throws', () => {
    expect(() => BalanceSchema.parse({})).toThrow();
  });

  it('valid PositionSchema parses correctly', () => {
    const obj = {
      symbol: 'AAPL',
      symbolId: 1,
      openQuantity: 5,
      closedQuantity: 2,
      currentMarketValue: 500,
      currentPrice: 100,
      averageEntryPrice: 90,
      closedPnl: 10,
      openPnl: 5,
      totalCost: 450,
      isRealTime: true,
      isUnderReorg: false,
    };
    expect(PositionSchema.parse(obj)).toEqual(obj);
  });
  it('PositionSchema allows string isRealTime', () => {
    const obj = {
      symbol: 'AAPL',
      symbolId: 1,
      openQuantity: 5,
      closedQuantity: 2,
      currentMarketValue: 500,
      currentPrice: 100,
      averageEntryPrice: 90,
      closedPnl: 10,
      openPnl: 5,
      totalCost: 450,
      isRealTime: 'Individual',
      isUnderReorg: false,
    };
    expect(PositionSchema.parse(obj)).toEqual(obj);
  });
  it('invalid PositionSchema throws', () => {
    expect(() => PositionSchema.parse({})).toThrow();
  });

  it('valid ExecutionSchema parses correctly', () => {
    const obj = {
      symbol: 'AAPL',
      symbolId: 1,
      quantity: 10,
      side: 'Buy',
      price: 150,
      id: 100,
      orderId: 200,
      orderChainId: 300,
      exchangeExecId: 'EID',
      timestamp: '2025-01-01T00:00:00Z',
      notes: '',
      venue: 'NASDAQ',
      totalCost: 1500,
      orderPlacementCommission: 1,
      commission: 1,
      executionFee: 1,
      secFee: 1,
      canadianExecutionFee: 0,
      parentId: 0,
    };
    expect(ExecutionSchema.parse(obj)).toEqual(obj);
  });
  it('invalid ExecutionSchema throws', () => {
    expect(() => ExecutionSchema.parse({})).toThrow();
  });

  it('valid AccountActivitySchema parses correctly', () => {
    const obj = {
      tradeDate: '2025-01-01',
      transactionDate: '2025-01-01',
      settlementDate: '2025-01-02',
      action: 'Buy',
      symbol: 'AAPL',
      symbolId: 1,
      description: 'desc',
      currency: 'USD',
      quantity: 10,
      price: 150,
      grossAmount: 1500,
      commission: 1,
      netAmount: 1499,
      type: 'Trade',
    };
    expect(AccountActivitySchema.parse(obj)).toEqual(obj);
  });
  it('invalid AccountActivitySchema throws', () => {
    expect(() => AccountActivitySchema.parse({})).toThrow();
  });
});
