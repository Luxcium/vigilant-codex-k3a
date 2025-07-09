import { z } from 'zod';

/** Supported currency codes */
export type Currency = 'USD' | 'CAD';
export const CurrencySchema = z.enum(['USD', 'CAD']);

/** Listing exchanges for securities */
export type ListingExchange =
  | 'TSX'
  | 'TSXV'
  | 'CNSX'
  | 'MX'
  | 'NASDAQ'
  | 'NYSE'
  | 'NYSEAM'
  | 'ARCA'
  | 'OPRA'
  | 'PinkSheets'
  | 'OTCBB';
export const ListingExchangeSchema = z.enum([
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
]);

/** Account types */
export type AccountType =
  | 'Cash'
  | 'Margin'
  | 'TFSA'
  | 'RRSP'
  | 'FHSA'
  | 'SRRSP'
  | 'LRRSP'
  | 'LIRA'
  | 'LIF'
  | 'RIF'
  | 'SRIF'
  | 'LRIF'
  | 'RRIF'
  | 'PRIF'
  | 'RESP'
  | 'FRESP';
export const AccountTypeSchema = z.enum([
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
]);

/** Client account holder types */
export type ClientAccountType =
  | 'Individual'
  | 'Joint'
  | 'Informal Trust'
  | 'Corporation'
  | 'Formal Trust'
  | 'Partnership'
  | 'Sole Proprietorship'
  | 'Family'
  | 'Joint and Informal Trust'
  | 'Institution';
export const ClientAccountTypeSchema = z.enum([
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
]);

/** Account status values */
export type AccountStatus =
  | 'Active'
  | 'Suspended (Closed)'
  | 'Suspended (View Only)'
  | 'Liquidate Only'
  | 'Closed';
export const AccountStatusSchema = z.enum([
  'Active',
  'Suspended (Closed)',
  'Suspended (View Only)',
  'Liquidate Only',
  'Closed',
]);

/** Tick directions */
export type TickType = 'Up' | 'Down' | 'Equal';
export const TickTypeSchema = z.enum(['Up', 'Down', 'Equal']);

/** Option contract types */
export type OptionType = 'Call' | 'Put';
export const OptionTypeSchema = z.enum(['Call', 'Put']);

/** Option duration cycles */
export type OptionDurationType = 'Weekly' | 'Monthly' | 'Quarterly' | 'LEAP';
export const OptionDurationTypeSchema = z.enum([
  'Weekly',
  'Monthly',
  'Quarterly',
  'LEAP',
]);

/** Option exercise style */
export type OptionExerciseType = 'American' | 'European';
export const OptionExerciseTypeSchema = z.enum(['American', 'European']);

/** Security types */
export type SecurityType =
  | 'Stock'
  | 'Option'
  | 'Bond'
  | 'Right'
  | 'Gold'
  | 'MutualFund'
  | 'Index';
export const SecurityTypeSchema = z.enum([
  'Stock',
  'Option',
  'Bond',
  'Right',
  'Gold',
  'MutualFund',
  'Index',
]);

/** Order state filter */
export type OrderStateFilter = 'All' | 'Open' | 'Closed';
export const OrderStateFilterSchema = z.enum(['All', 'Open', 'Closed']);

/** Order actions */
export type OrderAction = 'Buy' | 'Sell';
export const OrderActionSchema = z.enum(['Buy', 'Sell']);

/** Extended order sides */
export type OrderSide =
  | 'Buy'
  | 'Sell'
  | 'Short'
  | 'Cov'
  | 'BTO'
  | 'STC'
  | 'STO'
  | 'BTC';
export const OrderSideSchema = z.enum([
  'Buy',
  'Sell',
  'Short',
  'Cov',
  'BTO',
  'STC',
  'STO',
  'BTC',
]);

/** Order types */
export type OrderType =
  | 'Market'
  | 'Limit'
  | 'Stop'
  | 'StopLimit'
  | 'TrailStopInPercentage'
  | 'TrailStopInDollar'
  | 'TrailStopLimitInPercentage'
  | 'TrailStopLimitInDollar'
  | 'LimitOnOpen'
  | 'LimitOnClose';
export const OrderTypeSchema = z.enum([
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
]);

/** Time in force values */
export type TimeInForce =
  | 'Day'
  | 'GoodTillCanceled'
  | 'GoodTillExtendedDay'
  | 'GoodTillDate'
  | 'ImmediateOrCancel'
  | 'FillOrKill';
export const TimeInForceSchema = z.enum([
  'Day',
  'GoodTillCanceled',
  'GoodTillExtendedDay',
  'GoodTillDate',
  'ImmediateOrCancel',
  'FillOrKill',
]);

/** Order lifecycle states */
export type OrderState =
  | 'Failed'
  | 'Pending'
  | 'Accepted'
  | 'Rejected'
  | 'CancelPending'
  | 'Canceled'
  | 'PartialCanceled'
  | 'Partial'
  | 'Executed'
  | 'ReplacePending'
  | 'Replaced'
  | 'Stopped'
  | 'Suspended'
  | 'Expired'
  | 'Queued'
  | 'Triggered'
  | 'Activated'
  | 'PendingRiskReview'
  | 'ContingentOrder';
export const OrderStateSchema = z.enum([
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
]);

/** Candle intervals */
export type CandleInterval =
  | 'OneMinute'
  | 'TwoMinutes'
  | 'ThreeMinutes'
  | 'FourMinutes'
  | 'FiveMinutes'
  | 'TenMinutes'
  | 'FifteenMinutes'
  | 'TwentyMinutes'
  | 'HalfHour'
  | 'OneHour'
  | 'TwoHours'
  | 'FourHours'
  | 'OneDay'
  | 'OneWeek'
  | 'OneMonth'
  | 'OneYear';
export const CandleIntervalSchema = z.enum([
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
]);

/** Bracket order classes */
export type OrderClass = 'Primary' | 'Limit' | 'StopLoss';
export const OrderClassSchema = z.enum(['Primary', 'Limit', 'StopLoss']);

/** Option strategy types */
export type StrategyType =
  | 'CoveredCall'
  | 'MarriedPuts'
  | 'VerticalCallSpread'
  | 'VerticalPutSpread'
  | 'CalendarCallSpread'
  | 'CalendarPutSpread'
  | 'DiagonalCallSpread'
  | 'DiagonalPutSpread'
  | 'Collar'
  | 'Straddle'
  | 'Strangle'
  | 'ButterflyCall'
  | 'ButterflyPut'
  | 'IronButterfly'
  | 'CondorCall'
  | 'Custom';
export const StrategyTypeSchema = z.enum([
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
]);
