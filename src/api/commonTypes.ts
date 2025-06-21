import { z } from 'zod';

/** Allowed currency codes */
export type Currency = 'USD' | 'CAD';
export const CurrencySchema = z.enum(['USD', 'CAD']);

/** Listing exchange codes */
export type ListingExchange =
  | 'TSX' | 'TSXV' | 'CNSX' | 'MX'
  | 'NASDAQ' | 'NYSE' | 'NYSEAM' | 'ARCA'
  | 'OPRA' | 'PinkSheets' | 'OTCBB';
export const ListingExchangeSchema = z.enum([
  'TSX','TSXV','CNSX','MX','NASDAQ','NYSE','NYSEAM','ARCA','OPRA','PinkSheets','OTCBB'
]);

/** Registration account types */
export type AccountType =
  | 'Cash' | 'Margin'
  | 'TFSA' | 'RRSP' | 'FHSA' | 'SRRSP' | 'LRRSP'
  | 'LIRA' | 'LIF' | 'RIF' | 'SRIF' | 'LRIF'
  | 'RRIF' | 'PRIF'
  | 'RESP' | 'FRESP';
export const AccountTypeSchema = z.enum([
  'Cash','Margin','TFSA','RRSP','FHSA','SRRSP','LRRSP','LIRA','LIF','RIF','SRIF','LRIF','RRIF','PRIF','RESP','FRESP'
]);

/** Client account ownership categories */
export type ClientAccountType =
  | 'Individual' | 'Joint' | 'Informal Trust'
  | 'Corporation' | 'Formal Trust' | 'Partnership'
  | 'Sole Proprietorship' | 'Family'
  | 'Joint and Informal Trust' | 'Institution';
export const ClientAccountTypeSchema = z.enum([
  'Individual','Joint','Informal Trust','Corporation','Formal Trust','Partnership','Sole Proprietorship','Family','Joint and Informal Trust','Institution'
]);

/** Possible status values for an account */
export type AccountStatus =
  | 'Active'
  | 'Suspended (Closed)'
  | 'Suspended (View Only)'
  | 'Liquidate Only'
  | 'Closed';
export const AccountStatusSchema = z.enum([
  'Active','Suspended (Closed)','Suspended (View Only)','Liquidate Only','Closed'
]);

export type TickType = 'Up' | 'Down' | 'Equal';
export const TickTypeSchema = z.enum(['Up','Down','Equal']);

export type OptionType = 'Call' | 'Put';
export const OptionTypeSchema = z.enum(['Call','Put']);

export type OptionDurationType = 'Weekly' | 'Monthly' | 'Quarterly' | 'LEAP';
export const OptionDurationTypeSchema = z.enum(['Weekly','Monthly','Quarterly','LEAP']);

export type OptionExerciseType = 'American' | 'European';
export const OptionExerciseTypeSchema = z.enum(['American','European']);

export type SecurityType = 'Stock' | 'Option' | 'Bond' | 'Right' | 'Gold' | 'MutualFund' | 'Index';
export const SecurityTypeSchema = z.enum(['Stock','Option','Bond','Right','Gold','MutualFund','Index']);

export type OrderStateFilter = 'All' | 'Open' | 'Closed';
export const OrderStateFilterSchema = z.enum(['All','Open','Closed']);

export type OrderAction = 'Buy' | 'Sell';
export const OrderActionSchema = z.enum(['Buy','Sell']);

export type OrderSide = 'Buy' | 'Sell' | 'Short' | 'Cov' | 'BTO' | 'STC' | 'STO' | 'BTC';
export const OrderSideSchema = z.enum(['Buy','Sell','Short','Cov','BTO','STC','STO','BTC']);

export type OrderType =
  | 'Market' | 'Limit' | 'Stop' | 'StopLimit'
  | 'TrailStopInPercentage' | 'TrailStopInDollar'
  | 'TrailStopLimitInPercentage' | 'TrailStopLimitInDollar'
  | 'LimitOnOpen' | 'LimitOnClose';
export const OrderTypeSchema = z.enum([
  'Market','Limit','Stop','StopLimit','TrailStopInPercentage','TrailStopInDollar','TrailStopLimitInPercentage','TrailStopLimitInDollar','LimitOnOpen','LimitOnClose'
]);

export type TimeInForce =
  | 'Day' | 'GoodTillCanceled' | 'GoodTillExtendedDay'
  | 'GoodTillDate' | 'ImmediateOrCancel' | 'FillOrKill';
export const TimeInForceSchema = z.enum([
  'Day','GoodTillCanceled','GoodTillExtendedDay','GoodTillDate','ImmediateOrCancel','FillOrKill'
]);

export type OrderState =
  | 'Failed' | 'Pending' | 'Accepted' | 'Rejected'
  | 'CancelPending' | 'Canceled' | 'PartialCanceled'
  | 'Partial' | 'Executed' | 'ReplacePending' | 'Replaced'
  | 'Stopped' | 'Suspended' | 'Expired' | 'Queued'
  | 'Triggered' | 'Activated' | 'PendingRiskReview'
  | 'ContingentOrder';
export const OrderStateSchema = z.enum([
  'Failed','Pending','Accepted','Rejected','CancelPending','Canceled','PartialCanceled','Partial','Executed','ReplacePending','Replaced','Stopped','Suspended','Expired','Queued','Triggered','Activated','PendingRiskReview','ContingentOrder'
]);

export type CandleInterval =
  | 'OneMinute' | 'TwoMinutes' | 'ThreeMinutes' | 'FourMinutes' | 'FiveMinutes'
  | 'TenMinutes' | 'FifteenMinutes' | 'TwentyMinutes'
  | 'HalfHour' | 'OneHour' | 'TwoHours' | 'FourHours'
  | 'OneDay' | 'OneWeek' | 'OneMonth' | 'OneYear';
export const CandleIntervalSchema = z.enum([
  'OneMinute','TwoMinutes','ThreeMinutes','FourMinutes','FiveMinutes','TenMinutes','FifteenMinutes','TwentyMinutes','HalfHour','OneHour','TwoHours','FourHours','OneDay','OneWeek','OneMonth','OneYear'
]);

export type OrderClass = 'Primary' | 'Limit' | 'StopLoss';
export const OrderClassSchema = z.enum(['Primary','Limit','StopLoss']);

export type StrategyType =
  | 'CoveredCall' | 'MarriedPuts'
  | 'VerticalCallSpread' | 'VerticalPutSpread'
  | 'CalendarCallSpread' | 'CalendarPutSpread'
  | 'DiagonalCallSpread' | 'DiagonalPutSpread'
  | 'Collar' | 'Straddle' | 'Strangle'
  | 'ButterflyCall' | 'ButterflyPut'
  | 'IronButterfly' | 'CondorCall'
  | 'Custom';
export const StrategyTypeSchema = z.enum([
  'CoveredCall','MarriedPuts','VerticalCallSpread','VerticalPutSpread','CalendarCallSpread','CalendarPutSpread','DiagonalCallSpread','DiagonalPutSpread','Collar','Straddle','Strangle','ButterflyCall','ButterflyPut','IronButterfly','CondorCall','Custom'
]);
