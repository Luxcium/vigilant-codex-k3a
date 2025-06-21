import { z } from 'zod';
import { Currency, CurrencySchema } from './enums';

/** Market trading configuration */
export interface Market {
  name: string;
  tradingVenues: string[];
  defaultTradingVenue: string;
  primaryOrderRoutes: string[];
  secondaryOrderRoutes: string[];
  level1Feeds: string[];
  level2Feeds: string[];
  extendedStartTime: string;
  startTime: string;
  endTime: string;
  extendedEndTime: string;
  currency: Currency;
  snapQuotesLimit: number;
}

/** Zod schema for {@link Market} */
export const MarketSchema = z.object({
  name: z.string(),
  tradingVenues: z.array(z.string()),
  defaultTradingVenue: z.string(),
  primaryOrderRoutes: z.array(z.string()),
  secondaryOrderRoutes: z.array(z.string()),
  level1Feeds: z.array(z.string()),
  level2Feeds: z.array(z.string()),
  extendedStartTime: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  extendedEndTime: z.string(),
  currency: CurrencySchema,
  snapQuotesLimit: z.number().int()
});

/** Quote for equities and other instruments */
export interface Quote {
  symbol: string;
  symbolId: number;
  tier: string;
  bidPrice: number | null;
  bidSize: number | null;
  askPrice: number | null;
  askSize: number | null;
  lastTradePrice: number | null;
  lastTradePriceTrHrs: number | null;
  lastTradeSize: number | null;
  lastTradeTick: string | null;
  lastTradeTime: string | null;
  volume: number | null;
  openPrice: number | null;
  highPrice: number | null;
  lowPrice: number | null;
  vwap: number | null;
  isDelayed: boolean;
}

/** Zod schema for {@link Quote} */
export const QuoteSchema = z.object({
  symbol: z.string(),
  symbolId: z.number().int(),
  tier: z.string(),
  bidPrice: z.number().nullable(),
  bidSize: z.number().nullable(),
  askPrice: z.number().nullable(),
  askSize: z.number().nullable(),
  lastTradePrice: z.number().nullable(),
  lastTradePriceTrHrs: z.number().nullable(),
  lastTradeSize: z.number().nullable(),
  lastTradeTick: z.string().nullable(),
  lastTradeTime: z.string().nullable(),
  volume: z.number().nullable(),
  openPrice: z.number().nullable(),
  highPrice: z.number().nullable(),
  lowPrice: z.number().nullable(),
  vwap: z.number().nullable(),
  isDelayed: z.boolean()
});

/** Option quote with Greeks */
export interface OptionQuote extends Quote {
  underlying: string;
  underlyingId: number;
  expiryDate: string;
  strikePrice: number;
  optionType: string;
  volatility: number | null;
  delta: number | null;
  gamma: number | null;
  theta: number | null;
  vega: number | null;
  rho: number | null;
  openInterest: number | null;
}

/** Zod schema for {@link OptionQuote} */
export const OptionQuoteSchema = QuoteSchema.extend({
  underlying: z.string(),
  underlyingId: z.number().int(),
  expiryDate: z.string(),
  strikePrice: z.number(),
  optionType: z.string(),
  volatility: z.number().nullable(),
  delta: z.number().nullable(),
  gamma: z.number().nullable(),
  theta: z.number().nullable(),
  vega: z.number().nullable(),
  rho: z.number().nullable(),
  openInterest: z.number().nullable()
});

/** Strategy quote for option strategies */
export interface StrategyQuote {
  variantId: number;
  bidPrice: number | null;
  askPrice: number | null;
  underlying: string;
  underlyingId: number;
}

/** Zod schema for {@link StrategyQuote} */
export const StrategyQuoteSchema = z.object({
  variantId: z.number().int(),
  bidPrice: z.number().nullable(),
  askPrice: z.number().nullable(),
  underlying: z.string(),
  underlyingId: z.number().int()
});

/** OHLC candle */
export interface Candle {
  start: string;
  end: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/** Zod schema for {@link Candle} */
export const CandleSchema = z.object({
  start: z.string(),
  end: z.string(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number()
});
