// src/types/dev/enums.ts

/**
 * @packageDocumentation
 * Central registry of **Questrade** enumerations expressed as `as const` arrays
 * and string‑literal union types.  Each list is accompanied by:
 *
 * 1. A strongly‑typed readonly array (e.g. `CURRENCY_CODES`).
 * 2. The derived union type (e.g. `CurrencyCode`).
 * 3. A human‑readable labels map for UI helpers (e.g. `CurrencyLabels`).
 * 4. A Zod schema (e.g. `CurrencyCodeSchema`) for runtime validation.
 *
 * > **Design note:** We avoid the legacy `enum` keyword to eliminate extra
 * > JS output and to keep tree‑shaking effective.  String‑literal unions also
 * > enable exhaustive `switch` narrowing.
 *
 * @see https://www.questrade.com/api/documentation/rest-operations/enumerations/enumerations
 */

import { z } from 'zod';

/** generic mapped‑type for label dictionaries */
export type Labels<T extends readonly string[]> = Record<T[number], string>;

// ────────────────────────────────────────────────────────────────────────────
// Currency
// ────────────────────────────────────────────────────────────────────────────
export const CURRENCY_CODES = ['USD', 'CAD'] as const;
export type CurrencyCode = (typeof CURRENCY_CODES)[number];
export const CurrencyCodeSchema = z.enum(CURRENCY_CODES);
export const CurrencyLabels: Labels<typeof CURRENCY_CODES> = {
  USD: 'US dollar',
  CAD: 'Canadian dollar',
};

// ────────────────────────────────────────────────────────────────────────────
// Listing Exchange
// ────────────────────────────────────────────────────────────────────────────
export const LISTING_EXCHANGES = [
  'TSX',
  'TSXV',
  'CNSX',
  'MX',
  'NASDAQ',
  'NYSE',
  'NYSEAM',
  'ARCA',
  'OPRA',
  'PinkSheets',
  'OTCBB',
] as const;
export type ListingExchange = (typeof LISTING_EXCHANGES)[number];
export const ListingExchangeSchema = z.enum(LISTING_EXCHANGES);
export const ListingExchangeLabels: Labels<typeof LISTING_EXCHANGES> = {
  TSX: 'Toronto Stock Exchange',
  TSXV: 'Toronto Venture Exchange',
  CNSX: 'Canadian National Stock Exchange',
  MX: 'Montreal Exchange',
  NASDAQ: 'NASDAQ',
  NYSE: 'New York Stock Exchange',
  NYSEAM: 'NYSE AMERICAN',
  ARCA: 'NYSE Arca',
  OPRA: 'Option Reporting Authority',
  PinkSheets: 'Pink Sheets',
  OTCBB: 'OTC Bulletin Board',
};

// ────────────────────────────────────────────────────────────────────────────
// Account Type
// ────────────────────────────────────────────────────────────────────────────
export const ACCOUNT_TYPES = [
  'Cash',
  'Margin',
  'TFSA',
  'RRSP',
  'FHSA',
  'SRRSP',
  'LRRSP',
  'LIRA',
  'LIF',
  'RIF',
  'SRIF',
  'LRIF',
  'RRIF',
  'PRIF',
  'RESP',
  'FRESP',
] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];
export const AccountTypeSchema = z.enum(ACCOUNT_TYPES);
export const AccountTypeLabels: Labels<typeof ACCOUNT_TYPES> = {
  Cash: 'Cash account',
  Margin: 'Margin account',
  TFSA: 'Tax Free Savings Account',
  RRSP: 'Registered Retirement Savings Plan',
  FHSA: 'First Home Savings Account',
  SRRSP: 'Spousal RRSP',
  LRRSP: 'Locked-In RRSP',
  LIRA: 'Locked-In Retirement Account',
  LIF: 'Life Income Fund',
  RIF: 'Retirement Income Fund',
  SRIF: 'Spousal RIF',
  LRIF: 'Locked-In RIF',
  RRIF: 'Registered RIF',
  PRIF: 'Prescribed RIF',
  RESP: 'Individual Registered Education Savings Plan',
  FRESP: 'Family RESP',
};

// ────────────────────────────────────────────────────────────────────────────
// Client Account Type
// ────────────────────────────────────────────────────────────────────────────
export const CLIENT_ACCOUNT_TYPES = [
  'Individual',
  'Joint',
  'Informal Trust',
  'Corporation',
  'Formal Trust',
  'Partnership',
  'Sole Proprietorship',
  'Family',
  'Joint and Informal Trust',
  'Institution',
] as const;
export type ClientAccountType = (typeof CLIENT_ACCOUNT_TYPES)[number];
export const ClientAccountTypeSchema = z.enum(CLIENT_ACCOUNT_TYPES);
export const ClientAccountTypeLabels: Labels<typeof CLIENT_ACCOUNT_TYPES> = {
  'Individual': 'Account held by an individual',
  'Joint': 'Account held jointly by several individuals',
  'Informal Trust': 'Account held by an informal trust',
  'Corporation': 'Account held by a corporation',
  'Formal Trust': 'Account held by a formal trust',
  'Partnership': 'Account held by a partnership',
  'Sole Proprietorship': 'Account held by a sole proprietorship',
  'Family': 'Account held by a family',
  'Joint and Informal Trust': 'Joint account held by an informal trust',
  'Institution': 'Account held by an institution',
};

// ────────────────────────────────────────────────────────────────────────────
// Account Status
// ────────────────────────────────────────────────────────────────────────────
export const ACCOUNT_STATUSES = [
  'Active',
  'Suspended (Closed)',
  'Suspended (View Only)',
  'Liquidate Only',
  'Closed',
] as const;
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];
export const AccountStatusSchema = z.enum(ACCOUNT_STATUSES);
export const AccountStatusLabels: Labels<typeof ACCOUNT_STATUSES> = {
  'Active': 'Active',
  'Suspended (Closed)': 'Suspended (Closed)',
  'Suspended (View Only)': 'Suspended (View Only)',
  'Liquidate Only': 'Liquidate Only',
  'Closed': 'Closed',
};

// ────────────────────────────────────────────────────────────────────────────
// Tick Type
// ────────────────────────────────────────────────────────────────────────────
export const TICK_TYPES = ['Up', 'Down', 'Equal'] as const;
export type TickType = (typeof TICK_TYPES)[number];
export const TickTypeSchema = z.enum(TICK_TYPES);
export const TickTypeLabels: Labels<typeof TICK_TYPES> = {
  Up: 'Designates an uptick',
  Down: 'Designates a downtick',
  Equal: 'Same price as previous tick',
};

// ────────────────────────────────────────────────────────────────────────────
// Option Type / Duration / Exercise
// ────────────────────────────────────────────────────────────────────────────
export const OPTION_TYPES = ['Call', 'Put'] as const;
export type OptionType = (typeof OPTION_TYPES)[number];
export const OptionTypeSchema = z.enum(OPTION_TYPES);
export const OptionTypeLabels: Labels<typeof OPTION_TYPES> = {
  Call: 'Call option',
  Put: 'Put option',
};

export const OPTION_DURATION_TYPES = [
  'Weekly',
  'Monthly',
  'Quarterly',
  'LEAP',
] as const;
export type OptionDurationType = (typeof OPTION_DURATION_TYPES)[number];
export const OptionDurationTypeSchema = z.enum(OPTION_DURATION_TYPES);
export const OptionDurationTypeLabels: Labels<typeof OPTION_DURATION_TYPES> = {
  Weekly: 'Weekly expiry cycle',
  Monthly: 'Monthly expiry cycle',
  Quarterly: 'Quarterly expiry cycle',
  LEAP: 'Long‑term Equity Appreciation contract',
};

export const OPTION_EXERCISE_TYPES = ['American', 'European'] as const;
export type OptionExerciseType = (typeof OPTION_EXERCISE_TYPES)[number];
export const OptionExerciseTypeSchema = z.enum(OPTION_EXERCISE_TYPES);
export const OptionExerciseTypeLabels: Labels<typeof OPTION_EXERCISE_TYPES> = {
  American: 'American style',
  European: 'European style',
};

// ────────────────────────────────────────────────────────────────────────────
// Security Type
// ────────────────────────────────────────────────────────────────────────────
export const SECURITY_TYPES = [
  'Stock',
  'Option',
  'Bond',
  'Right',
  'Gold',
  'MutualFund',
  'Index',
] as const;
export type SecurityType = (typeof SECURITY_TYPES)[number];
export const SecurityTypeSchema = z.enum(SECURITY_TYPES);
export const SecurityTypeLabels: Labels<typeof SECURITY_TYPES> = {
  Stock: 'Equities, ETFs, ADRs, etc.',
  Option: 'Equity and index options',
  Bond: 'Corporate & government bonds',
  Right: 'Rights & warrants',
  Gold: 'Physical gold',
  MutualFund: 'Mutual funds',
  Index: 'Indices (e.g., DJIA)',
};

// ────────────────────────────────────────────────────────────────────────────
// Order State Filter Type
// ────────────────────────────────────────────────────────────────────────────
export const ORDER_STATE_FILTER_TYPES = ['All', 'Open', 'Closed'] as const;
export type OrderStateFilterType = (typeof ORDER_STATE_FILTER_TYPES)[number];
export const OrderStateFilterTypeSchema = z.enum(ORDER_STATE_FILTER_TYPES);
export const OrderStateFilterTypeLabels: Labels<
  typeof ORDER_STATE_FILTER_TYPES
> = {
  All: 'All orders',
  Open: 'Only open orders',
  Closed: 'Only closed orders',
};

// ────────────────────────────────────────────────────────────────────────────
// Order Action (basic Buy/Sell)
// ────────────────────────────────────────────────────────────────────────────
export const ORDER_ACTIONS = ['Buy', 'Sell'] as const;
export type OrderAction = (typeof ORDER_ACTIONS)[number];
export const OrderActionSchema = z.enum(ORDER_ACTIONS);
export const OrderActionLabels: Labels<typeof ORDER_ACTIONS> = {
  Buy: 'Buy (purchase securities)',
  Sell: 'Sell (dispose securities)',
};

// ────────────────────────────────────────────────────────────────────────────
// Client Order Side (extended)
// ────────────────────────────────────────────────────────────────────────────
export const CLIENT_ORDER_SIDES = [
  'Buy',
  'Sell',
  'Short',
  'Cov',
  'BTO',
  'STC',
  'STO',
  'BTC',
] as const;
export type ClientOrderSide = (typeof CLIENT_ORDER_SIDES)[number];
export const ClientOrderSideSchema = z.enum(CLIENT_ORDER_SIDES);
export const ClientOrderSideLabels: Labels<typeof CLIENT_ORDER_SIDES> = {
  Buy: 'Buy',
  Sell: 'Sell',
  Short: 'Sell short',
  Cov: 'Cover the short',
  BTO: 'Buy‑To‑Open',
  STC: 'Sell‑To‑Close',
  STO: 'Sell‑To‑Open',
  BTC: 'Buy‑To‑Close',
};

// ────────────────────────────────────────────────────────────────────────────
// Order Type
// ────────────────────────────────────────────────────────────────────────────
export const ORDER_TYPES = [
  'Market',
  'Limit',
  'Stop',
  'StopLimit',
  'TrailStopInPercentage',
  'TrailStopInDollar',
  'TrailStopLimitInPercentage',
  'TrailStopLimitInDollar',
  'LimitOnOpen',
  'LimitOnClose',
] as const;
export type OrderType = (typeof ORDER_TYPES)[number];
export const OrderTypeSchema = z.enum(ORDER_TYPES);
export const OrderTypeLabels: Labels<typeof ORDER_TYPES> = {
  Market: 'Market',
  Limit: 'Limit',
  Stop: 'Stop',
  StopLimit: 'Stop‑Limit',
  TrailStopInPercentage: 'Trailing stop (%)',
  TrailStopInDollar: 'Trailing stop ($)',
  TrailStopLimitInPercentage: 'Trailing stop‑limit (%)',
  TrailStopLimitInDollar: 'Trailing stop‑limit ($)',
  LimitOnOpen: 'Limit‑on‑open',
  LimitOnClose: 'Limit‑on‑close',
};

// ────────────────────────────────────────────────────────────────────────────
// Time‑In‑Force
// ────────────────────────────────────────────────────────────────────────────
export const TIME_IN_FORCE_TYPES = [
  'Day',
  'GoodTillCanceled',
  'GoodTillExtendedDay',
  'GoodTillDate',
  'ImmediateOrCancel',
  'FillOrKill',
] as const;
export type TimeInForce = (typeof TIME_IN_FORCE_TYPES)[number];
export const TimeInForceSchema = z.enum(TIME_IN_FORCE_TYPES);
export const TimeInForceLabels: Labels<typeof TIME_IN_FORCE_TYPES> = {
  Day: 'Day',
  GoodTillCanceled: 'Good‑Till‑Canceled',
  GoodTillExtendedDay: 'Good‑Till‑Extended‑Day',
  GoodTillDate: 'Good‑Till‑Date',
  ImmediateOrCancel: 'Immediate‑Or‑Cancel',
  FillOrKill: 'Fill‑Or‑Kill',
};

// ────────────────────────────────────────────────────────────────────────────
// Order State
// ────────────────────────────────────────────────────────────────────────────
export const ORDER_STATES = [
  'Failed',
  'Pending',
  'Accepted',
  'Rejected',
  'CancelPending',
  'Canceled',
  'PartialCanceled',
  'Partial',
  'Executed',
  'ReplacePending',
  'Replaced',
  'Stopped',
  'Suspended',
  'Expired',
  'Queued',
  'Triggered',
  'Activated',
  'PendingRiskReview',
  'ContingentOrder',
] as const;
export type OrderState = (typeof ORDER_STATES)[number];
export const OrderStateSchema = z.enum(ORDER_STATES);
// Labels identical to values for now
export const OrderStateLabels: Labels<typeof ORDER_STATES> = Object.fromEntries(
  ORDER_STATES.map(s => [s, s])
) as Labels<typeof ORDER_STATES>;

// ────────────────────────────────────────────────────────────────────────────
// Order Class
// ────────────────────────────────────────────────────────────────────────────
export const ORDER_CLASSES = ['Primary', 'Limit', 'StopLoss'] as const;
export type OrderClass = (typeof ORDER_CLASSES)[number];
export const OrderClassSchema = z.enum(ORDER_CLASSES);
export const OrderClassLabels: Labels<typeof ORDER_CLASSES> = {
  Primary: 'Primary order',
  Limit: 'Profit exit order',
  StopLoss: 'Loss exit order',
};

// ────────────────────────────────────────────────────────────────────────────
// Strategy Types
// ────────────────────────────────────────────────────────────────────────────
export const STRATEGY_TYPES = [
  'CoveredCall',
  'MarriedPuts',
  'VerticalCallSpread',
  'VerticalPutSpread',
  'CalendarCallSpread',
  'CalendarPutSpread',
  'DiagonalCallSpread',
  'DiagonalPutSpread',
  'Collar',
  'Straddle',
  'Strangle',
  'ButterflyCall',
  'ButterflyPut',
  'IronButterfly',
  'CondorCall',
  'Custom',
] as const;
export type StrategyType = (typeof STRATEGY_TYPES)[number];
export const StrategyTypeSchema = z.enum(STRATEGY_TYPES);
export const StrategyTypeLabels: Labels<typeof STRATEGY_TYPES> = {
  CoveredCall: 'Covered Call',
  MarriedPuts: 'Married Put',
  VerticalCallSpread: 'Vertical Call Spread',
  VerticalPutSpread: 'Vertical Put Spread',
  CalendarCallSpread: 'Calendar Call Spread',
  CalendarPutSpread: 'Calendar Put Spread',
  DiagonalCallSpread: 'Diagonal Call Spread',
  DiagonalPutSpread: 'Diagonal Put Spread',
  Collar: 'Collar',
  Straddle: 'Straddle',
  Strangle: 'Strangle',
  ButterflyCall: 'Butterfly Call',
  ButterflyPut: 'Butterfly Put',
  IronButterfly: 'Iron Butterfly',
  CondorCall: 'Condor',
  Custom: 'Custom / user defined',
};

// ────────────────────────────────────────────────────────────────────────────
// Historical Data Granularity (Candle Intervals)
// ────────────────────────────────────────────────────────────────────────────
export const CANDLE_INTERVALS = [
  'OneMinute',
  'TwoMinutes',
  'ThreeMinutes',
  'FourMinutes',
  'FiveMinutes',
  'TenMinutes',
  'FifteenMinutes',
  'TwentyMinutes',
  'HalfHour',
  'OneHour',
  'TwoHours',
  'FourHours',
  'OneDay',
  'OneWeek',
  'OneMonth',
  'OneYear',
] as const;
export type CandleInterval = (typeof CANDLE_INTERVALS)[number];
export const CandleIntervalSchema = z.enum(CANDLE_INTERVALS);
// Labels identical to value names here
export const CandleIntervalLabels: Labels<typeof CANDLE_INTERVALS> =
  Object.fromEntries(CANDLE_INTERVALS.map(s => [s, s])) as Labels<
    typeof CANDLE_INTERVALS
  >;
