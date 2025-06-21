import { z } from 'zod';
import { Account, AccountSchema, Balance, BalanceSchema, Position, PositionSchema, Execution, ExecutionSchema, AccountActivity, AccountActivitySchema } from './accounts';
import { Order, OrderSchema } from './orders';
import { Market, MarketSchema, Quote, QuoteSchema, OptionQuote, OptionQuoteSchema, StrategyQuote, StrategyQuoteSchema, Candle, CandleSchema } from './markets';
import { SymbolDetail, SymbolDetailSchema, SymbolSearchResult, SymbolSearchResultSchema, ChainPerExpiryDate, OptionChainSchema } from './symbols';

/** Response from GET /accounts */
export interface AccountsResponse {
  accounts: Account[];
  userId: number;
}
export const AccountsResponseSchema = z.object({
  accounts: z.array(AccountSchema),
  userId: z.number().int()
});

/** Response from GET /accounts/:id/balances */
export interface AccountBalancesResponse {
  perCurrencyBalances: Balance[];
  combinedBalances: Balance[];
  sodPerCurrencyBalances: Balance[];
  sodCombinedBalances: Balance[];
}
export const AccountBalancesResponseSchema = z.object({
  perCurrencyBalances: z.array(BalanceSchema),
  combinedBalances: z.array(BalanceSchema),
  sodPerCurrencyBalances: z.array(BalanceSchema),
  sodCombinedBalances: z.array(BalanceSchema)
});

/** Response from GET /accounts/:id/positions */
export interface PositionsResponse {
  positions: Position[];
}
export const PositionsResponseSchema = z.object({
  positions: z.array(PositionSchema)
});

/** Response from GET /accounts/:id/executions */
export interface ExecutionsResponse {
  executions: Execution[];
}
export const ExecutionsResponseSchema = z.object({
  executions: z.array(ExecutionSchema)
});

/** Response from GET /accounts/:id/activities */
export interface ActivitiesResponse {
  activities: AccountActivity[];
}
export const ActivitiesResponseSchema = z.object({
  activities: z.array(AccountActivitySchema)
});

/** Response from GET /accounts/:id/orders */
export interface OrdersResponse {
  orders: Order[];
}
export const OrdersResponseSchema = z.object({
  orders: z.array(OrderSchema)
});

export type OrderResponse = OrdersResponse;
export const OrderResponseSchema = OrdersResponseSchema;

/** Response from GET /time */
export interface TimeResponse {
  time: string;
}
export const TimeResponseSchema = z.object({
  time: z.string()
});

/** Response from GET /markets */
export interface MarketsResponse {
  markets: Market[];
}
export const MarketsResponseSchema = z.object({
  markets: z.array(MarketSchema)
});

/** Response from GET quotes endpoints */
export interface QuotesResponse {
  quotes: Quote[];
}
export const QuotesResponseSchema = z.object({
  quotes: z.array(QuoteSchema)
});

/** Response from GET option quotes */
export interface OptionQuotesResponse {
  optionQuotes: OptionQuote[];
}
export const OptionQuotesResponseSchema = z.object({
  optionQuotes: z.array(OptionQuoteSchema)
});

/** Response from GET strategy quotes */
export interface StrategyQuotesResponse {
  strategyQuotes: StrategyQuote[];
}
export const StrategyQuotesResponseSchema = z.object({
  strategyQuotes: z.array(StrategyQuoteSchema)
});

/** Response from GET candles */
export interface CandlesResponse {
  candles: Candle[];
}
export const CandlesResponseSchema = z.object({
  candles: z.array(CandleSchema)
});

/** Response from GET symbols */
export interface SymbolsResponse {
  symbols: SymbolDetail[];
}
export const SymbolsResponseSchema = z.object({
  symbols: z.array(SymbolDetailSchema)
});

/** Response from GET symbols search */
export interface SymbolSearchResponse {
  symbols: SymbolSearchResult[];
}
export const SymbolSearchResponseSchema = z.object({
  symbols: z.array(SymbolSearchResultSchema)
});

/** Response from GET option chain */
export interface OptionsChainResponse {
  options: ChainPerExpiryDate[];
}
export const OptionsChainResponseSchema = OptionChainSchema;
