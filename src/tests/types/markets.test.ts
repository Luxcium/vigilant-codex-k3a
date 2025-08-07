import { describe, expect, it } from 'vitest';
import {
  CandleSchema,
  MarketSchema,
  OptionQuoteSchema,
  QuoteSchema,
  StrategyQuoteSchema,
} from '../../core/types/markets.ts';
describe('Market related schemas', () => {
  it('valid MarketSchema parses', () => {
    const obj = {
      name: 'Test',
      tradingVenues: ['A'],
      defaultTradingVenue: 'A',
      primaryOrderRoutes: ['R'],
      secondaryOrderRoutes: ['S'],
      level1Feeds: ['F1'],
      level2Feeds: ['F2'],
      extendedStartTime: '08:00',
      startTime: '09:00',
      endTime: '16:00',
      extendedEndTime: '17:00',
      currency: 'USD',
      snapQuotesLimit: 5,
    };
    expect(MarketSchema.parse(obj)).toEqual(obj);
  });
  it('invalid MarketSchema throws', () => {
    expect(() => MarketSchema.parse({})).toThrow();
  });

  it('valid QuoteSchema parses', () => {
    const obj = {
      symbol: 'SYM',
      symbolId: 1,
      tier: 'T',
      bidPrice: null,
      bidSize: null,
      askPrice: null,
      askSize: null,
      lastTradePrice: null,
      lastTradePriceTrHrs: null,
      lastTradeSize: null,
      lastTradeTick: null,
      lastTradeTime: null,
      volume: null,
      openPrice: null,
      highPrice: null,
      lowPrice: null,
      vwap: null,
      delay: 1,
      isHalted: false,
    };
    const expected = { ...obj, isDelayed: true };
    delete (expected as any).delay;
    expect(QuoteSchema.parse(obj)).toEqual(expected);
  });
  it('valid OptionQuoteSchema parses', () => {
    const base = QuoteSchema.parse({
      symbol: 'S',
      symbolId: 1,
      tier: 'T',
      bidPrice: null,
      bidSize: null,
      askPrice: null,
      askSize: null,
      lastTradePrice: null,
      lastTradePriceTrHrs: null,
      lastTradeSize: null,
      lastTradeTick: null,
      lastTradeTime: null,
      volume: null,
      openPrice: null,
      highPrice: null,
      lowPrice: null,
      vwap: null,
      isDelayed: false,
      isHalted: false,
    });
    const obj = {
      ...base,
      underlying: 'U',
      underlyingId: 2,
      expiryDate: '2025-01-01',
      strikePrice: 10,
      optionType: 'Call',
      volatility: null,
      delta: null,
      gamma: null,
      theta: null,
      vega: null,
      rho: null,
      openInterest: null,
    };
    expect(OptionQuoteSchema.parse(obj)).toEqual(obj);
  });
  it('valid StrategyQuoteSchema parses', () => {
    const obj = {
      variantId: 1,
      bidPrice: null,
      askPrice: null,
      underlying: 'U',
      underlyingId: 2,
      openPrice: null,
      volatility: null,
      delta: null,
      gamma: null,
      theta: null,
      vega: null,
      rho: null,
      isRealTime: null,
    };
    expect(StrategyQuoteSchema.parse(obj)).toEqual(obj);
  });
  it('valid CandleSchema parses', () => {
    const obj = {
      start: 's',
      end: 'e',
      open: 1,
      high: 2,
      low: 0,
      close: 1.5,
      volume: 100,
    };
    expect(CandleSchema.parse(obj)).toEqual(obj);
  });
});
