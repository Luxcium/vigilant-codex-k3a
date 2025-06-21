import { z } from 'zod';

/** Supported currency codes */
export type Currency = 'USD' | 'CAD';
export const CurrencySchema = z.enum(['USD', 'CAD']);

/** Listing exchanges */
export type ListingExchange =
  | 'TSX' | 'TSXV' | 'CNSX' | 'MX'
  | 'NASDAQ' | 'NYSE' | 'NYSEAM' | 'ARCA'
  | 'OPRA' | 'PinkSheets' | 'OTCBB';
export const ListingExchangeSchema = z.enum([
  'TSX', 'TSXV', 'CNSX', 'MX',
  'NASDAQ', 'NYSE', 'NYSEAM', 'ARCA',
  'OPRA', 'PinkSheets', 'OTCBB'
]);

/** Account types */
export type AccountType =
  | 'Cash' | 'Margin'
  | 'TFSA' | 'RRSP' | 'FHSA' | 'SRRSP' | 'LRRSP'
  | 'LIRA' | 'LIF' | 'RIF' | 'SRIF' | 'LRIF'
  | 'RRIF' | 'PRIF'
  | 'RESP' | 'FRESP';
export const AccountTypeSchema = z.enum([
  'Cash','Margin','TFSA','RRSP','FHSA','SRRSP','LRRSP',
  'LIRA','LIF','RIF','SRIF','LRIF','RRIF','PRIF','RESP','FRESP'
]);

/** Client account holder types */
export type ClientAccountType =
  | 'Individual' | 'Joint' | 'Informal Trust'
  | 'Corporation' | 'Formal Trust' | 'Partnership'
  | 'Sole Proprietorship' | 'Family'
  | 'Joint and Informal Trust' | 'Institution';
export const ClientAccountTypeSchema = z.enum([
  'Individual','Joint','Informal Trust','Corporation','Formal Trust',
  'Partnership','Sole Proprietorship','Family','Joint and Informal Trust','Institution'
]);

/** Account status values */
export type AccountStatus =
  | 'Active'
  | 'Suspended (Closed)'
  | 'Suspended (View Only)'
  | 'Liquidate Only'
  | 'Closed';
export const AccountStatusSchema = z.enum([
  'Active','Suspended (Closed)','Suspended (View Only)','Liquidate Only','Closed'
]);

/** Tick directions */
export type TickType = 'Up' | 'Down' | 'Equal';
export const TickTypeSchema = z.enum(['Up', 'Down', 'Equal']);

/** Option call/put */
export type OptionType = 'Call' | 'Put';
export const OptionTypeSchema = z.enum(['Call', 'Put']);

/** Option expiration cycles */
export type OptionDurationType = 'Weekly' | 'Monthly' | 'Quarterly' | 'LEAP';
export const OptionDurationTypeSchema = z.enum([
  'Weekly', 'Monthly', 'Quarterly', 'LEAP'
]);

/** Option exercise style */
export type OptionExerciseType = 'American' | 'European';
export const OptionExerciseTypeSchema = z.enum(['American', 'European']);

/** Security types */
export type SecurityType = 'Stock' | 'Option' | 'Bond' | 'Right' | 'Gold' | 'MutualFund' | 'Index';
export const SecurityTypeSchema = z.enum([
  'Stock','Option','Bond','Right','Gold','MutualFund','Index'
]);

/** Order state filter */
export type OrderStateFilter = 'All' | 'Open' | 'Closed';
export const OrderStateFilterSchema = z.enum(['All', 'Open', 'Closed']);

/** Basic buy/sell actions */
export type OrderAction = 'Buy' | 'Sell';
export const OrderActionSchema = z.enum(['Buy', 'Sell']);

/** Extended order side values */
export type OrderSide = 'Buy' | 'Sell' | 'Short' | 'Cov' | 'BTO' | 'STC' | 'STO' | 'BTC';
export const OrderSideSchema = z.enum(['Buy','Sell','Short','Cov','BTO','STC','STO','BTC']);

/** Order types */
export type OrderType =
  | 'Market' | 'Limit' | 'Stop' | 'StopLimit'
  | 'TrailStopInPercentage' | 'TrailStopInDollar'
  | 'TrailStopLimitInPercentage' | 'TrailStopLimitInDollar'
  | 'LimitOnOpen' | 'LimitOnClose';
export const OrderTypeSchema = z.enum([
  'Market','Limit','Stop','StopLimit',
  'TrailStopInPercentage','TrailStopInDollar',
  'TrailStopLimitInPercentage','TrailStopLimitInDollar',
  'LimitOnOpen','LimitOnClose'
]);

/** Time-in-force instructions */
export type TimeInForce =
  | 'Day' | 'GoodTillCanceled' | 'GoodTillExtendedDay'
  | 'GoodTillDate' | 'ImmediateOrCancel' | 'FillOrKill';
export const TimeInForceSchema = z.enum([
  'Day','GoodTillCanceled','GoodTillExtendedDay','GoodTillDate','ImmediateOrCancel','FillOrKill'
]);

/** Order lifecycle states */
export type OrderState =
  | 'Failed' | 'Pending' | 'Accepted' | 'Rejected'
  | 'CancelPending' | 'Canceled' | 'PartialCanceled'
  | 'Partial' | 'Executed' | 'ReplacePending' | 'Replaced'
  | 'Stopped' | 'Suspended' | 'Expired' | 'Queued'
  | 'Triggered' | 'Activated' | 'PendingRiskReview'
  | 'ContingentOrder';
export const OrderStateSchema = z.enum([
  'Failed','Pending','Accepted','Rejected',
  'CancelPending','Canceled','PartialCanceled',
  'Partial','Executed','ReplacePending','Replaced',
  'Stopped','Suspended','Expired','Queued',
  'Triggered','Activated','PendingRiskReview','ContingentOrder'
]);

/** Candle intervals */
export type CandleInterval =
  | 'OneMinute' | 'TwoMinutes' | 'ThreeMinutes' | 'FourMinutes' | 'FiveMinutes'
  | 'TenMinutes' | 'FifteenMinutes' | 'TwentyMinutes'
  | 'HalfHour' | 'OneHour' | 'TwoHours' | 'FourHours'
  | 'OneDay' | 'OneWeek' | 'OneMonth' | 'OneYear';
export const CandleIntervalSchema = z.enum([
  'OneMinute','TwoMinutes','ThreeMinutes','FourMinutes','FiveMinutes',
  'TenMinutes','FifteenMinutes','TwentyMinutes',
  'HalfHour','OneHour','TwoHours','FourHours',
  'OneDay','OneWeek','OneMonth','OneYear'
]);

/** Bracket order classes */
export type OrderClass = 'Primary' | 'Limit' | 'StopLoss';
export const OrderClassSchema = z.enum(['Primary','Limit','StopLoss']);

/** Multi-leg strategy types */
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
  'CoveredCall','MarriedPuts','VerticalCallSpread','VerticalPutSpread',
  'CalendarCallSpread','CalendarPutSpread','DiagonalCallSpread','DiagonalPutSpread',
  'Collar','Straddle','Strangle','ButterflyCall','ButterflyPut',
  'IronButterfly','CondorCall','Custom'
]);

export interface Account {
  number: string;
  type: AccountType;
  status: AccountStatus;
  isPrimary: boolean;
  isBilling: boolean;
  clientAccountType: ClientAccountType;
}
export const AccountSchema = z.object({
  number: z.string(),
  type: AccountTypeSchema,
  status: AccountStatusSchema,
  isPrimary: z.boolean(),
  isBilling: z.boolean(),
  clientAccountType: ClientAccountTypeSchema
});

export interface Balance {
  currency: Currency;
  cash: number;
  marketValue: number;
  totalEquity: number;
  buyingPower: number;
  maintenanceExcess: number;
  isRealTime: boolean;
}
export const BalanceSchema = z.object({
  currency: CurrencySchema,
  cash: z.number(),
  marketValue: z.number(),
  totalEquity: z.number(),
  buyingPower: z.number(),
  maintenanceExcess: z.number(),
  isRealTime: z.boolean()
});

export interface Position {
  symbol: string;
  symbolId: number;
  openQuantity: number;
  closedQuantity: number;
  currentMarketValue: number;
  currentPrice: number;
  averageEntryPrice: number;
  closedPnl: number;
  openPnl: number;
  totalCost: number;
  isRealTime: boolean;
  isUnderReorg: boolean;
}
export const PositionSchema = z.object({
  symbol: z.string(),
  symbolId: z.number().int(),
  openQuantity: z.number(),
  closedQuantity: z.number(),
  currentMarketValue: z.number(),
  currentPrice: z.number(),
  averageEntryPrice: z.number(),
  closedPnl: z.number(),
  openPnl: z.number(),
  totalCost: z.number(),
  isRealTime: z.boolean(),
  isUnderReorg: z.boolean()
});

export interface Execution {
  symbol: string;
  symbolId: number;
  quantity: number;
  side: OrderAction;
  price: number;
  id: number;
  orderId: number;
  orderChainId: number;
  exchangeExecId: string;
  timestamp: string;
  notes: string;
  venue: string;
  totalCost: number;
  orderPlacementCommission: number;
  commission: number;
  executionFee: number;
  secFee: number;
  canadianExecutionFee: number;
  parentId: number;
}
export const ExecutionSchema = z.object({
  symbol: z.string(),
  symbolId: z.number().int(),
  quantity: z.number().int(),
  side: OrderActionSchema,
  price: z.number(),
  id: z.number().int(),
  orderId: z.number().int(),
  orderChainId: z.number().int(),
  exchangeExecId: z.string(),
  timestamp: z.string(),
  notes: z.string(),
  venue: z.string(),
  totalCost: z.number(),
  orderPlacementCommission: z.number(),
  commission: z.number(),
  executionFee: z.number(),
  secFee: z.number(),
  canadianExecutionFee: z.number().int(),
  parentId: z.number().int()
});

export interface AccountActivity {
  tradeDate: string;
  transactionDate: string;
  settlementDate: string;
  action: string;
  symbol: string;
  symbolId: number;
  description: string;
  currency: Currency;
  quantity: number;
  price: number;
  grossAmount: number;
  commission: number;
  netAmount: number;
  type: string;
}
export const AccountActivitySchema = z.object({
  tradeDate: z.string(),
  transactionDate: z.string(),
  settlementDate: z.string(),
  action: z.string(),
  symbol: z.string(),
  symbolId: z.number().int(),
  description: z.string(),
  currency: CurrencySchema,
  quantity: z.number(),
  price: z.number(),
  grossAmount: z.number(),
  commission: z.number(),
  netAmount: z.number(),
  type: z.string()
});

export interface OrderLeg {
  strategyType: StrategyType;
  triggerStopPrice: number | null;
  orderGroupId: number;
  orderClass: OrderClass;
}
export const OrderLegSchema = z.object({
  strategyType: StrategyTypeSchema,
  triggerStopPrice: z.number().nullable(),
  orderGroupId: z.number().int(),
  orderClass: OrderClassSchema
});

export interface Order {
  id: number;
  symbol: string;
  symbolId: number;
  totalQuantity: number;
  openQuantity: number;
  filledQuantity: number;
  canceledQuantity: number;
  side: OrderSide;
  orderType: OrderType;
  limitPrice: number | null;
  stopPrice: number | null;
  isAllOrNone: boolean;
  isAnonymous: boolean;
  icebergQuantity: number | null;
  minQuantity: number | null;
  avgExecPrice: number | null;
  lastExecPrice: number | null;
  source: string;
  timeInForce: TimeInForce;
  gtdDate: string | null;
  state: OrderState;
  clientReasonStr: string;
  chainId: number;
  creationTime: string;
  updateTime: string;
  notes: string;
  primaryRoute: string;
  secondaryRoute: string;
  orderRoute: string;
  venueHoldingOrder: string;
  commissionCharged: number;
  exchangeOrderId: string;
  isSignificantShareholder: boolean;
  isInsider: boolean;
  isLimitOffsetInDollar: boolean;
  userId: number;
  placementCommission: number;
  legs?: OrderLeg[];
}
export const OrderSchema = z.object({
  id: z.number().int(),
  symbol: z.string(),
  symbolId: z.number().int(),
  totalQuantity: z.number(),
  openQuantity: z.number(),
  filledQuantity: z.number(),
  canceledQuantity: z.number(),
  side: OrderSideSchema,
  orderType: OrderTypeSchema,
  limitPrice: z.number().nullable(),
  stopPrice: z.number().nullable(),
  isAllOrNone: z.boolean(),
  isAnonymous: z.boolean(),
  icebergQuantity: z.number().nullable(),
  minQuantity: z.number().nullable(),
  avgExecPrice: z.number().nullable(),
  lastExecPrice: z.number().nullable(),
  source: z.string(),
  timeInForce: TimeInForceSchema,
  gtdDate: z.string().nullable(),
  state: OrderStateSchema,
  clientReasonStr: z.string(),
  chainId: z.number().int(),
  creationTime: z.string(),
  updateTime: z.string(),
  notes: z.string(),
  primaryRoute: z.string(),
  secondaryRoute: z.string(),
  orderRoute: z.string(),
  venueHoldingOrder: z.string(),
  commissionCharged: z.number(),
  exchangeOrderId: z.string(),
  isSignificantShareholder: z.boolean(),
  isInsider: z.boolean(),
  isLimitOffsetInDollar: z.boolean(),
  userId: z.number().int(),
  placementCommission: z.number(),
  legs: z.array(OrderLegSchema).optional()
});

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
  lastTradeTick: TickType | null;
  lastTradeTime: string | null;
  volume: number | null;
  openPrice: number | null;
  highPrice: number | null;
  lowPrice: number | null;
  vwap: number | null;
  isDelayed: boolean;
}
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
  lastTradeTick: TickTypeSchema.nullable(),
  lastTradeTime: z.string().nullable(),
  volume: z.number().nullable(),
  openPrice: z.number().nullable(),
  highPrice: z.number().nullable(),
  lowPrice: z.number().nullable(),
  vwap: z.number().nullable(),
  isDelayed: z.boolean()
});

export interface OptionQuote extends Quote {
  underlying: string;
  underlyingId: number;
  expiryDate: string;
  strikePrice: number;
  optionType: OptionType;
  volatility: number | null;
  delta: number | null;
  gamma: number | null;
  theta: number | null;
  vega: number | null;
  rho: number | null;
  openInterest: number | null;
}
export const OptionQuoteSchema = QuoteSchema.extend({
  underlying: z.string(),
  underlyingId: z.number().int(),
  expiryDate: z.string(),
  strikePrice: z.number(),
  optionType: OptionTypeSchema,
  volatility: z.number().nullable(),
  delta: z.number().nullable(),
  gamma: z.number().nullable(),
  theta: z.number().nullable(),
  vega: z.number().nullable(),
  rho: z.number().nullable(),
  openInterest: z.number().nullable()
});

export interface StrategyQuote {
  variantId: number;
  bidPrice: number | null;
  askPrice: number | null;
  underlying: string;
  underlyingId: number;
}
export const StrategyQuoteSchema = z.object({
  variantId: z.number().int(),
  bidPrice: z.number().nullable(),
  askPrice: z.number().nullable(),
  underlying: z.string(),
  underlyingId: z.number().int()
});

export interface Candle {
  start: string;
  end: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
export const CandleSchema = z.object({
  start: z.string(),
  end: z.string(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number()
});

export interface OptionDeliverables {
  underlyings: {
    underlyingSymbol: string;
    underlyingSymbolId: number;
    multiplier: number;
  }[];
  cashInLieu: number;
}

export interface MinTick {
  pivot: number;
  minTick: number;
}

export interface SymbolDetail {
  symbol: string;
  symbolId: number;
  prevDayClosePrice: number;
  highPrice52: number;
  lowPrice52: number;
  averageVol3Months: number;
  averageVol20Days: number;
  outstandingShares: number;
  eps: number;
  pe: number;
  dividend: number;
  yield: number;
  exDate: string | null;
  marketCap: number;
  tradeUnit: number;
  optionType: OptionType | null;
  optionDurationType: OptionDurationType | null;
  optionRoot: string;
  optionContractDeliverables: OptionDeliverables;
  optionExerciseType: OptionExerciseType | null;
  listingExchange: ListingExchange;
  description: string;
  securityType: SecurityType;
  optionExpiryDate: string | null;
  dividendDate: string | null;
  optionStrikePrice: number | null;
  isTradable: boolean;
  isQuotable: boolean;
  hasOptions: boolean;
  minTicks: MinTick[];
  industrySector: string;
  industryGroup: string;
  industrySubGroup: string;
}
export const SymbolDetailSchema = z.object({
  symbol: z.string(),
  symbolId: z.number().int(),
  prevDayClosePrice: z.number(),
  highPrice52: z.number(),
  lowPrice52: z.number(),
  averageVol3Months: z.number().int(),
  averageVol20Days: z.number().int(),
  outstandingShares: z.number().int(),
  eps: z.number(),
  pe: z.number(),
  dividend: z.number(),
  yield: z.number(),
  exDate: z.string().nullable(),
  marketCap: z.number(),
  tradeUnit: z.number().int(),
  optionType: OptionTypeSchema.nullable(),
  optionDurationType: OptionDurationTypeSchema.nullable(),
  optionRoot: z.string(),
  optionContractDeliverables: z.object({
    underlyings: z.array(z.object({
      multiplier: z.number().int(),
      underlyingSymbol: z.string(),
      underlyingSymbolId: z.number().int()
    })),
    cashInLieu: z.number()
  }),
  optionExerciseType: OptionExerciseTypeSchema.nullable(),
  listingExchange: ListingExchangeSchema,
  description: z.string(),
  securityType: SecurityTypeSchema,
  optionExpiryDate: z.string().nullable(),
  dividendDate: z.string().nullable(),
  optionStrikePrice: z.number().nullable(),
  isTradable: z.boolean(),
  isQuotable: z.boolean(),
  hasOptions: z.boolean(),
  minTicks: z.array(z.object({
    pivot: z.number(),
    minTick: z.number()
  })),
  industrySector: z.string(),
  industryGroup: z.string(),
  industrySubGroup: z.string()
});

export interface SymbolSearchResult {
  symbol: string;
  symbolId: number;
  description: string;
  securityType: SecurityType;
  listingExchange: ListingExchange;
  isTradable: boolean;
  isQuotable: boolean;
}
export const SymbolSearchResultSchema = z.object({
  symbol: z.string(),
  symbolId: z.number().int(),
  description: z.string(),
  securityType: SecurityTypeSchema,
  listingExchange: ListingExchangeSchema,
  isTradable: z.boolean(),
  isQuotable: z.boolean()
});

export interface ChainPerStrikePrice {
  strikePrice: number;
  callSymbolId: number;
  putSymbolId: number;
}

export interface ChainPerRoot {
  root: string;
  multiplier: number;
  chainPerStrikePrice: ChainPerStrikePrice[];
}

export interface ChainPerExpiryDate {
  expiryDate: string;
  description: string;
  listingExchange: ListingExchange;
  optionExerciseType: OptionExerciseType;
  chainPerRoot: ChainPerRoot[];
}

export interface OptionChain {
  options: ChainPerExpiryDate[];
}
export const OptionChainSchema = z.object({
  options: z.array(z.object({
    expiryDate: z.string(),
    description: z.string(),
    listingExchange: ListingExchangeSchema,
    optionExerciseType: OptionExerciseTypeSchema,
    chainPerRoot: z.array(z.object({
      root: z.string(),
      multiplier: z.number().int(),
      chainPerStrikePrice: z.array(z.object({
        strikePrice: z.number(),
        callSymbolId: z.number().int(),
        putSymbolId: z.number().int()
      }))
    }))
  }))
});

export interface AccountsResponse { accounts: Account[]; userId: number; }
export const AccountsResponseSchema = z.object({
  accounts: z.array(AccountSchema),
  userId: z.number().int()
});

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

export interface PositionsResponse { positions: Position[]; }
export const PositionsResponseSchema = z.object({
  positions: z.array(PositionSchema)
});

export interface ExecutionsResponse { executions: Execution[]; }
export const ExecutionsResponseSchema = z.object({
  executions: z.array(ExecutionSchema)
});

export interface ActivitiesResponse { activities: AccountActivity[]; }
export const ActivitiesResponseSchema = z.object({
  activities: z.array(AccountActivitySchema)
});

export interface OrdersResponse { orders: Order[]; }
export const OrdersResponseSchema = z.object({
  orders: z.array(OrderSchema)
});

export type OrderResponse = OrdersResponse;
export const OrderResponseSchema = OrdersResponseSchema;

export interface TimeResponse { time: string; }
export const TimeResponseSchema = z.object({
  time: z.string()
});

export interface MarketsResponse { markets: Market[]; }
export const MarketsResponseSchema = z.object({
  markets: z.array(MarketSchema)
});

export interface QuotesResponse { quotes: Quote[]; }
export const QuotesResponseSchema = z.object({
  quotes: z.array(QuoteSchema)
});

export interface OptionQuotesResponse { optionQuotes: OptionQuote[]; }
export const OptionQuotesResponseSchema = z.object({
  optionQuotes: z.array(OptionQuoteSchema)
});

export interface StrategyQuotesResponse { strategyQuotes: StrategyQuote[]; }
export const StrategyQuotesResponseSchema = z.object({
  strategyQuotes: z.array(StrategyQuoteSchema)
});

export interface CandlesResponse { candles: Candle[]; }
export const CandlesResponseSchema = z.object({
  candles: z.array(CandleSchema)
});

export interface SymbolsResponse { symbols: SymbolDetail[]; }
export const SymbolsResponseSchema = z.object({
  symbols: z.array(SymbolDetailSchema)
});

export interface SymbolSearchResponse { symbols: SymbolSearchResult[]; }
export const SymbolSearchResponseSchema = z.object({
  symbols: z.array(SymbolSearchResultSchema)
});

export interface OptionsChainResponse { options: ChainPerExpiryDate[]; }
export const OptionsChainResponseSchema = OptionChainSchema;

export interface OrderRequest {
  symbolId: number;
  quantity: number;
  orderType: OrderType;
  action: OrderAction;
  timeInForce: TimeInForce;
  primaryRoute: string;
  secondaryRoute: string;
  limitPrice?: number;
  stopPrice?: number;
  gtdDate?: string;
  isAllOrNone?: boolean;
  isAnonymous?: boolean;
  icebergQuantity?: number;
  minQuantity?: number;
}
export const OrderRequestSchema = z.object({
  symbolId: z.number().int(),
  quantity: z.number(),
  orderType: OrderTypeSchema,
  action: OrderActionSchema,
  timeInForce: TimeInForceSchema,
  primaryRoute: z.string(),
  secondaryRoute: z.string(),
  limitPrice: z.number().optional(),
  stopPrice: z.number().optional(),
  gtdDate: z.string().optional(),
  isAllOrNone: z.boolean().optional(),
  isAnonymous: z.boolean().optional(),
  icebergQuantity: z.number().optional(),
  minQuantity: z.number().optional()
});

export type OrderImpactRequest = OrderRequest;
export const OrderImpactRequestSchema = OrderRequestSchema;

export interface OrderPlacementResponse { orders: Order[]; }
export const OrderPlacementResponseSchema = z.object({
  orders: z.array(OrderSchema)
});

export interface OrderImpactResponse {
  buyingPowerEffect: number;
  buyingPowerResult: number;
  maintenanceExcessEffect: number;
  maintenanceExcessResult: number;
  tradeValue: number;
  fees: number;
}
export const OrderImpactResponseSchema = z.object({
  buyingPowerEffect: z.number(),
  buyingPowerResult: z.number(),
  maintenanceExcessEffect: z.number(),
  maintenanceExcessResult: z.number(),
  tradeValue: z.number(),
  fees: z.number()
});

export interface MultiLegOrderRequest {
  strategy: StrategyType;
  legs: { symbolId: number; action: OrderAction; legQuantity: number }[];
  limitPrice?: number;
  orderType: OrderType;
  timeInForce: TimeInForce;
  primaryRoute: string;
  secondaryRoute: string;
}
export const MultiLegOrderRequestSchema = z.object({
  strategy: StrategyTypeSchema,
  legs: z.array(z.object({
    symbolId: z.number().int(),
    action: OrderActionSchema,
    legQuantity: z.number().int()
  })),
  limitPrice: z.number().optional(),
  orderType: OrderTypeSchema,
  timeInForce: TimeInForceSchema,
  primaryRoute: z.string(),
  secondaryRoute: z.string()
});

export interface BracketOrderRequest {
  primary: OrderRequest;
  profit: OrderRequest;
  loss: OrderRequest;
}
export const BracketOrderRequestSchema = z.object({
  primary: OrderRequestSchema,
  profit: OrderRequestSchema,
  loss: OrderRequestSchema
});

export interface OrderCancelResponse { orders: Order[]; }
export const OrderCancelResponseSchema = z.object({
  orders: z.array(OrderSchema)
});
