/**
 * @packageDocumentation
 * @remarks
 * Central registry of **Questrade** enumerations expressed as
 * `as const` readonly arrays and string‑literal unions.  This module
 * provides:
 *
 * 1. A canonical set of literal values for every enumeration defined by the
 *    API specification.
 * 2. `...Labels` look‑up tables for human‑readable descriptions.
 * 3. Runtime **type‑guards** (see bottom) generated from the same arrays.
 *
 * Using string literals instead of the `enum` keyword avoids code bloat and
 * ensures exhaustiveness checks remain accurate when values are re‑exported
 * across project boundaries.  Tools such as **TypeDoc** will recognise these
 * objects as enumerations when decorated with `@enum`.
 *
 * @see https://tsdoc.org/pages/spec/tag_kinds/ for tag semantics ([tsdoc.org](https://tsdoc.org/pages/spec/tag_kinds/?utm_source=chatgpt.com), [tsdoc.org](https://tsdoc.org/pages/tags/remarks/?utm_source=chatgpt.com))
 * @see https://typedoc.org/documents/Tags._enum.html for `@enum` guidance ([typedoc.org](https://typedoc.org/documents/Tags._enum.html?utm_source=chatgpt.com))
 */

import { z } from 'zod'; // retained for future zod‑schema helpers

type Labels<T extends readonly string[]> = Record<T[number], string>;

// ────────────────────────────────────────────────────────────────────────────
// CurrencyCode
// ────────────────────────────────────────────────────────────────────────────

/**
 * ISO‑4217 currency codes recognised by Questrade.
 *
 * @enum CurrencyCode
 * @remarks
 * • **USD** — United States dollar
 * • **CAD** — Canadian dollar
 *
 * @example
 * ```ts
 * if (isCurrencyCode("USD")) {
 *   // Compile‑time narrowing → "USD" | "CAD"
 * }
 * ```
 */
export const CURRENCY_CODES = ['USD', 'CAD'] as const;

export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export const CurrencyLabels: Labels<typeof CURRENCY_CODES> = {
  USD: 'US dollar',
  CAD: 'Canadian dollar',
};

/**
 * @public
 * Zod schema for validating CurrencyCode values.
 */
export const CurrencyCodeSchema = z.enum(CURRENCY_CODES);

// ────────────────────────────────────────────────────────────────────────────
// ListingExchange
// ────────────────────────────────────────────────────────────────────────────

/**
 * Primary security listing venues.
 *
 * @enum ListingExchange
 * @remarks
 * • **TSX** — Toronto Stock Exchange
 * • **TSXV** — Toronto Venture Exchange
 * • **CNSX** — Canadian National Stock Exchange
 * • **MX** — Montreal Exchange
 * • **NASDAQ** — NASDAQ
 * • **NYSE** — New York Stock Exchange
 * • **NYSEAM** — NYSE AMERICAN
 * • **ARCA** — NYSE Arca
 * • **OPRA** — Option Reporting Authority
 * • **PinkSheets** — Pink Sheets
 * • **OTCBB** — OTC Bulletin Board
 */
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

/**
 * @public
 * Zod schema for validating ListingExchange values.
 */
export const ListingExchangeSchema = z.enum(LISTING_EXCHANGES);

// ────────────────────────────────────────────────────────────────────────────
// AccountType
// ────────────────────────────────────────────────────────────────────────────

/**
 * Regulatory account wrappers offered to retail clients.
 *
 * @enum AccountType
 * @remarks
 * • **Cash** — Cash account
 * • **Margin** — Margin account
 * • **TFSA** — Tax‑Free Savings Account
 * • **RRSP** — Registered Retirement Savings Plan
 * • **FHSA** — First Home Savings Account
 * • **SRRSP** — Spousal RRSP
 * • **LRRSP** — Locked‑In RRSP
 * • **LIRA** — Locked‑In Retirement Account
 * • **LIF** — Life Income Fund
 * • **RIF** — Retirement Income Fund
 * • **SRIF** — Spousal RIF
 * • **LRIF** — Locked‑In RIF
 * • **RRIF** — Registered RIF
 * • **PRIF** — Prescribed RIF
 * • **RESP** — Individual Registered Education Savings Plan
 * • **FRESP** — Family RESP
 */
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

/**
 * @public
 * Zod schema for validating AccountType values.
 */
export const AccountTypeSchema = z.enum(ACCOUNT_TYPES);

// ────────────────────────────────────────────────────────────────────────────
// ClientAccountType
// ────────────────────────────────────────────────────────────────────────────

/**
 * Who legally owns an account.
 *
 * @enum ClientAccountType
 * @remarks
 * • **Individual** — Held by an individual
 * • **Joint** — Held jointly (e.g., spouses)
 * • **Informal Trust** — Informal trust
 * • **Corporation** — Corporate entity
 * • **Formal Trust** — Formal trust
 * • **Partnership** — Partnership entity
 * • **Sole Proprietorship** — Sole proprietor
 * • **Family** — Family account
 * • **Joint and Informal Trust** — Joint + informal trust
 * • **Institution** — Institutional account
 */
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
export const ClientAccountTypeLabels: Labels<typeof CLIENT_ACCOUNT_TYPES> = {
  'Individual': 'Account held by an individual',
  'Joint': 'Account held jointly by several individuals',
  'Informal Trust': 'Non-individual account held by an informal trust',
  'Corporation': 'Non-individual account held by a corporation',
  'Formal Trust': 'Non-individual account held by a formal trust',
  'Partnership': 'Non-individual account held by a partnership',
  'Sole Proprietorship': 'Non-individual account held by a sole proprietorship',
  'Family': 'Account held by a family',
  'Joint and Informal Trust':
    'Non-individual account held by a joint and informal trust',
  'Institution': 'Non-individual account held by an institution',
};

/**
 * @public
 * Zod schema for validating ClientAccountType values.
 */
export const ClientAccountTypeSchema = z.enum(CLIENT_ACCOUNT_TYPES);

// ────────────────────────────────────────────────────────────────────────────
// AccountStatus
// ────────────────────────────────────────────────────────────────────────────

/**
 * Operational state of a brokerage account.
 *
 * @enum AccountStatus
 * @remarks
 * • **Active** — Account is open and operational
 * • **Suspended (Closed)** — Account has been suspended and closed
 * • **Suspended (View Only)** — Account is suspended but can be viewed
 * • **Liquidate Only** — Account can only liquidate existing positions
 * • **Closed** — Account has been permanently closed
 */
export const ACCOUNT_STATUSES = [
  'Active',
  'Suspended (Closed)',
  'Suspended (View Only)',
  'Liquidate Only',
  'Closed',
] as const;
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];

/**
 * @public
 * Human-readable labels for account statuses.
 */
export const AccountStatusLabels: Labels<typeof ACCOUNT_STATUSES> = {
  'Active': 'Account is open and operational',
  'Suspended (Closed)': 'Account has been suspended and closed',
  'Suspended (View Only)': 'Account is suspended but can be viewed',
  'Liquidate Only': 'Account can only liquidate existing positions',
  'Closed': 'Account has been permanently closed',
};

/**
 * @public
 * Zod schema for validating AccountStatus values.
 */
export const AccountStatusSchema = z.enum(ACCOUNT_STATUSES);

// ────────────────────────────────────────────────────────────────────────────
// TickType
// ────────────────────────────────────────────────────────────────────────────

/**
 * Price movement direction between consecutive trades.
 *
 * @enum TickType
 * @remarks
 * • **Up** — Designates an uptick
 * • **Down** — Designates a downtick
 * • **Equal** — Same price as previous tick
 */
export const TICK_TYPES = ['Up', 'Down', 'Equal'] as const;
export type TickType = (typeof TICK_TYPES)[number];
export const TickTypeLabels: Labels<typeof TICK_TYPES> = {
  Up: 'Designates an uptick',
  Down: 'Designates a downtick',
  Equal: 'Same price as previous tick',
};

/**
 * @public
 * Zod schema for validating TickType values.
 */
export const TickTypeSchema = z.enum(TICK_TYPES);

// ────────────────────────────────────────────────────────────────────────────
// Option‑related literals
// ────────────────────────────────────────────────────────────────────────────

/**
 * Option contract sides.
 *
 * @enum OptionType
 * @remarks
 * • **Call** — Call option contract
 * • **Put** — Put option contract
 */
export const OPTION_TYPES = ['Call', 'Put'] as const;
export type OptionType = (typeof OPTION_TYPES)[number];

/**
 * @public
 * Human-readable labels for option types.
 */
export const OptionTypeLabels: Labels<typeof OPTION_TYPES> = {
  Call: 'Call option contract',
  Put: 'Put option contract',
};

/**
 * @public
 * Zod schema for validating OptionType values.
 */
export const OptionTypeSchema = z.enum(OPTION_TYPES);

/**
 * @public
 * Option expiry cycles recognised by the API.
 *
 * @enum OptionDurationType
 * @remarks
 * • **Weekly** — Weekly option expiration
 * • **Monthly** — Monthly option expiration
 * • **Quarterly** — Quarterly option expiration
 * • **LEAP** — Long-term equity anticipation securities
 */
export const OPTION_DURATION_TYPES = [
  'Weekly',
  'Monthly',
  'Quarterly',
  'LEAP',
] as const;
export type OptionDurationType = (typeof OPTION_DURATION_TYPES)[number];

/**
 * @public
 * Human-readable labels for option duration types.
 */
export const OptionDurationTypeLabels: Labels<typeof OPTION_DURATION_TYPES> = {
  Weekly: 'Weekly option expiration',
  Monthly: 'Monthly option expiration',
  Quarterly: 'Quarterly option expiration',
  LEAP: 'Long-term equity anticipation securities',
};

/**
 * @public
 * Zod schema for validating OptionDurationType values.
 */
export const OptionDurationTypeSchema = z.enum(OPTION_DURATION_TYPES);

/**
 * @public
 * Exercise styles.
 *
 * @enum OptionExerciseType
 * @remarks
 * • **American** — Can be exercised any time before expiration
 * • **European** — Can only be exercised at expiration
 */
export const OPTION_EXERCISE_TYPES = ['American', 'European'] as const;
export type OptionExerciseType = (typeof OPTION_EXERCISE_TYPES)[number];

/**
 * @public
 * Human-readable labels for option exercise types.
 */
export const OptionExerciseTypeLabels: Labels<typeof OPTION_EXERCISE_TYPES> = {
  American: 'Can be exercised any time before expiration',
  European: 'Can only be exercised at expiration',
};

/**
 * @public
 * Zod schema for validating OptionExerciseType values.
 */
export const OptionExerciseTypeSchema = z.enum(OPTION_EXERCISE_TYPES);

// ────────────────────────────────────────────────────────────────────────────
// SecurityType
// ────────────────────────────────────────────────────────────────────────────

/**
 * Instrument category.
 *
 * @enum SecurityType
 * @remarks
 * • **Stock** — Equity security
 * • **Option** — Option contract
 * • **Bond** — Bond security
 * • **Right** — Rights offering
 * • **Gold** — Gold/precious metals
 * • **MutualFund** — Mutual fund shares
 * • **Index** — Index instrument
 */
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

/**
 * @public
 * Human-readable labels for security types.
 */
export const SecurityTypeLabels: Labels<typeof SECURITY_TYPES> = {
  Stock: 'Equity security',
  Option: 'Option contract',
  Bond: 'Bond security',
  Right: 'Rights offering',
  Gold: 'Gold/precious metals',
  MutualFund: 'Mutual fund shares',
  Index: 'Index instrument',
};

/**
 * @public
 * Zod schema for validating SecurityType values.
 */
export const SecurityTypeSchema = z.enum(SECURITY_TYPES);

// ────────────────────────────────────────────────────────────────────────────
// Order‑related literals
// ────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Filters when querying order history.
 *
 * @enum OrderStateFilterType
 * @remarks
 * • **All** — Include all orders regardless of state
 * • **Open** — Include only open orders
 * • **Closed** — Include only closed orders
 */
export const ORDER_STATE_FILTER_TYPES = ['All', 'Open', 'Closed'] as const;
export type OrderStateFilterType = (typeof ORDER_STATE_FILTER_TYPES)[number];

/**
 * @public
 * Human-readable labels for order state filter types.
 */
export const OrderStateFilterTypeLabels: Labels<
  typeof ORDER_STATE_FILTER_TYPES
> = {
  All: 'Include all orders regardless of state',
  Open: 'Include only open orders',
  Closed: 'Include only closed orders',
};

/**
 * @public
 * Zod schema for validating OrderStateFilterType values.
 */
export const OrderStateFilterTypeSchema = z.enum(ORDER_STATE_FILTER_TYPES);

// ────────────────────────────────────────────────────────────────────────────
// HistoricalDataGranularity (Candle intervals)
// ────────────────────────────────────────────────────────────────────────────
/**
 * @public
 * Supported intervals for historical OHLCV candlestick data.
 *
 * @enum CandleInterval
 * @remarks
 * • **OneMinute** — One candlestick per 1 minute
 * • **TwoMinutes** — One candlestick per 2 minutes
 * • **ThreeMinutes** — One candlestick per 3 minutes
 * • **FourMinutes** — One candlestick per 4 minutes
 * • **FiveMinutes** — One candlestick per 5 minutes
 * • **TenMinutes** — One candlestick per 10 minutes
 * • **FifteenMinutes** — One candlestick per 15 minutes
 * • **TwentyMinutes** — One candlestick per 20 minutes
 * • **HalfHour** — One candlestick per 30 minutes
 * • **OneHour** — One candlestick per 1 hour
 * • **TwoHours** — One candlestick per 2 hours
 * • **FourHours** — One candlestick per 4 hours
 * • **OneDay** — One candlestick per 1 day
 * • **OneWeek** — One candlestick per 1 week
 * • **OneMonth** — One candlestick per 1 month
 * • **OneYear** — One candlestick per 1 year
 */
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

/**
 * @public
 * Human-readable labels for candle intervals.
 */
export const CandleIntervalLabels: Labels<typeof CANDLE_INTERVALS> = {
  OneMinute: 'One candlestick per 1 minute',
  TwoMinutes: 'One candlestick per 2 minutes',
  ThreeMinutes: 'One candlestick per 3 minutes',
  FourMinutes: 'One candlestick per 4 minutes',
  FiveMinutes: 'One candlestick per 5 minutes',
  TenMinutes: 'One candlestick per 10 minutes',
  FifteenMinutes: 'One candlestick per 15 minutes',
  TwentyMinutes: 'One candlestick per 20 minutes',
  HalfHour: 'One candlestick per 30 minutes',
  OneHour: 'One candlestick per 1 hour',
  TwoHours: 'One candlestick per 2 hours',
  FourHours: 'One candlestick per 4 hours',
  OneDay: 'One candlestick per 1 day',
  OneWeek: 'One candlestick per 1 week',
  OneMonth: 'One candlestick per 1 month',
  OneYear: 'One candlestick per 1 year',
};

/**
 * @public
 * Zod schema for validating CandleInterval values.
 */
export const CandleIntervalSchema = z.enum(CANDLE_INTERVALS);
