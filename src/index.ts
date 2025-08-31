/**
 * @packageDocumentation
 * @remarks
 * High-level SDK entry point exposing Questrade capabilities.
 */
import { QuestradeClient } from './infra/client/QuestradeClient';
import { KeyManager } from './infra/security/KeyManager';
import { AuthManager } from './infra/auth/manager';
import { RestClient } from './infra/http/restClient';
import { fetchCandles } from './infra/helpers/candles';

export const questrade = {
  QuestradeClient,
  KeyManager,
  AuthManager,
  RestClient,
  fetchCandles,
};

export default questrade;

export {
  AccountActivitySchema,
  AccountBalancesResponseSchema,
  AccountSchema,
  AccountsResponseSchema,
  AccountStatusSchema,
  AccountTypeSchema,
  ActivitiesResponseSchema,
  BalanceSchema,
  CandleIntervalSchema,
  CandleSchema,
  CandlesResponseSchema,
  ClientAccountTypeSchema,
  CurrencySchema,
  ExecutionSchema,
  ExecutionsResponseSchema,
  ListingExchangeSchema,
  MarketSchema,
  MarketsResponseSchema,
  MinTickSchema,
  OptionChainSchema,
  OptionDeliverableSchema,
  OptionDeliverablesSchema,
  OptionDurationTypeSchema,
  OptionExerciseTypeSchema,
  OptionQuoteSchema,
  OptionQuotesResponseSchema,
  OptionsChainResponseSchema,
  OptionTypeSchema,
  OrderActionSchema,
  OrderClassSchema,
  OrderLegSchema,
  OrderResponseSchema,
  OrderSchema,
  OrderSideSchema,
  OrdersResponseSchema,
  OrderStateFilterSchema,
  OrderStateSchema,
  OrderTypeSchema,
  PositionSchema,
  PositionsResponseSchema,
  QuoteSchema,
  QuotesResponseSchema,
  SecurityTypeSchema,
  StrategyQuoteSchema,
  StrategyQuotesResponseSchema,
  StrategyTypeSchema,
  SymbolDetailSchema,
  SymbolSearchResponseSchema,
  SymbolSearchResultSchema,
  SymbolsResponseSchema,
  TickTypeSchema,
  TimeInForceSchema,
  TimeResponseSchema,
} from '@/core/types';
export type {
  Account,
  AccountActivity,
  AccountBalancesResponse,
  AccountsResponse,
  AccountStatus,
  AccountType,
  ActivitiesResponse,
  Balance,
  Candle,
  CandleInterval,
  CandlesResponse,
  ChainPerExpiryDate,
  ChainPerRoot,
  ChainPerStrikePrice,
  ClientAccountType,
  Currency,
  Execution,
  ExecutionsResponse,
  ListingExchange,
  Market,
  MarketsResponse,
  MinTick,
  OptionChain,
  OptionDeliverable,
  OptionDeliverables,
  OptionDurationType,
  OptionExerciseType,
  OptionQuote,
  OptionQuotesResponse,
  OptionsChainResponse,
  OptionType,
  Order,
  OrderAction,
  OrderClass,
  OrderLeg,
  OrderResponse,
  OrderSide,
  OrdersResponse,
  OrderState,
  OrderStateFilter,
  OrderType,
  Position,
  PositionsResponse,
  Quote,
  QuotesResponse,
  SecurityType,
  StrategyQuote,
  StrategyQuotesResponse,
  StrategyType,
  SymbolDetail,
  SymbolSearchResponse,
  SymbolSearchResult,
  SymbolsResponse,
  TickType,
  TimeInForce,
  TimeResponse,
  ApiError,
  ApiErrorSchema,
} from '@/core/types';

export { logger } from './logger';
export type { QuestradeClientOptions } from './infra/client/QuestradeClient';
export type { CandlesParams } from './infra/helpers/candles';
export * from './core/errors';
export * from './core/rateLimit';
export * from './core/types';
export * as rpc from './rpc';
