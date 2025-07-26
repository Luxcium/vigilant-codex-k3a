/**
 * @packageDocumentation
 * @remarks
 * Questrade TypeScript SDK Barrel File
 *
 * This file re-exports all public modules, types, and main classes for the Questrade SDK.
 *
 * - Main entry point for SDK consumers.
 * - Only named and default exports (no wildcards).
 * - All exports are documented and type-safe.
 *
 * @see {@link https://www.questrade.com/api/documentation/getting-started | Questrade API Getting Started}
 * @see {@link https://www.questrade.com/api/documentation/authorization | Questrade API Authorization}
 * @see {@link https://www.questrade.com/api/documentation/rest-operations/account-calls/accounts | Questrade API Accounts}
 * @see {@link https://www.questrade.com/api/documentation/rest-operations/market-calls/markets | Questrade API Markets}
 */
// Client exports
import { QuestradeClient } from './client/QuestradeClient';
export { QuestradeClient, QuestradeClient as default };
export type { QuestradeClientOptions } from './client/QuestradeClient';
export { KeyManager } from './security/KeyManager';
// Authentication interfaces and manager
export type {
  OAuthProvider,
  OAuthTokenResponse,
  OAuthTokens,
  TokenStore,
} from './auth/interfaces';
export { AuthManager } from './auth/manager';

// HTTP client
export { RestClient } from './http/restClient';

// Helper utilities
export { fetchCandles } from './helpers/candles';
export type { CandlesParams } from './helpers/candles';

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
} from './types';
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
} from './types';
