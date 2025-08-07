import { describe, expect, it } from 'vitest';
import {
  AccountActivitySchema,
  AccountSchema,
  BalanceSchema,
  ExecutionSchema,
  PositionSchema,
} from '../../core/types/accounts';
import {
  CandleSchema,
  MarketSchema,
  OptionQuoteSchema,
  QuoteSchema,
  StrategyQuoteSchema,
} from '../../core/types/markets';
import { OrderSchema } from '../../core/types/orders';
import {
  AccountBalancesResponseSchema,
  AccountsResponseSchema,
  ActivitiesResponseSchema,
  OrderResponseSchema as AliasOrderResponseSchema,
  CandlesResponseSchema,
  ExecutionsResponseSchema,
  MarketsResponseSchema,
  OptionQuotesResponseSchema,
  OrderResponseSchema as OrdersResponseAliasSchema,
  OrdersResponseSchema,
  PositionsResponseSchema,
  QuotesResponseSchema,
  StrategyQuotesResponseSchema,
  SymbolSearchResponseSchema,
  SymbolsResponseSchema,
  TimeResponseSchema,
} from '../../core/types/responses';
import {
  SymbolDetailSchema,
  SymbolSearchResultSchema,
} from '../../core/types/symbols';

describe('Response schemas', () => {
  it('AccountsResponseSchema parses', () => {
    const obj = {
      accounts: [
        AccountSchema.parse({
          number: 'X',
          type: 'Cash',
          status: 'Active',
          isPrimary: true,
          isBilling: false,
          clientAccountType: 'Individual',
        }),
      ],
      userId: 1,
    };
    expect(AccountsResponseSchema.parse(obj)).toEqual(obj);
  });
  it('AccountBalancesResponseSchema parses', () => {
    const bal = BalanceSchema.parse({
      currency: 'USD',
      cash: 0,
      marketValue: 0,
      totalEquity: 0,
      buyingPower: 0,
      maintenanceExcess: 0,
      isRealTime: false,
    });
    const obj = {
      perCurrencyBalances: [bal],
      combinedBalances: [bal],
      sodPerCurrencyBalances: [bal],
      sodCombinedBalances: [bal],
    };
    expect(AccountBalancesResponseSchema.parse(obj)).toEqual(obj);
  });
  it('PositionsResponseSchema parses', () => {
    const pos = PositionSchema.parse({
      symbol: 'S',
      symbolId: 1,
      openQuantity: 1,
      closedQuantity: 0,
      currentMarketValue: 0,
      currentPrice: 0,
      averageEntryPrice: 0,
      closedPnl: 0,
      openPnl: 0,
      totalCost: 0,
      isRealTime: false,
      isUnderReorg: false,
    });
    expect(PositionsResponseSchema.parse({ positions: [pos] })).toEqual({
      positions: [pos],
    });
  });
  it('ExecutionsResponseSchema parses', () => {
    const exe = ExecutionSchema.parse({
      symbol: 'S',
      symbolId: 1,
      quantity: 1,
      side: 'Buy',
      price: 0,
      id: 1,
      orderId: 1,
      orderChainId: 1,
      exchangeExecId: 'E',
      timestamp: 't',
      notes: '',
      venue: 'V',
      totalCost: 0,
      orderPlacementCommission: 0,
      commission: 0,
      executionFee: 0,
      secFee: 0,
      canadianExecutionFee: 0,
      parentId: 0,
    });
    expect(ExecutionsResponseSchema.parse({ executions: [exe] })).toEqual({
      executions: [exe],
    });
  });
  it('ActivitiesResponseSchema parses', () => {
    const act = AccountActivitySchema.parse({
      tradeDate: 'd',
      transactionDate: 'd',
      settlementDate: 'd',
      action: 'A',
      symbol: 'S',
      symbolId: 1,
      description: 'D',
      currency: 'USD',
      quantity: 1,
      price: 0,
      grossAmount: 0,
      commission: 0,
      netAmount: 0,
      type: 'T',
    });
    expect(ActivitiesResponseSchema.parse({ activities: [act] })).toEqual({
      activities: [act],
    });
  });
  it('OrdersResponseSchema parses and alias works', () => {
    const ord = OrderSchema.parse({
      id: 1,
      symbol: 'S',
      symbolId: 1,
      totalQuantity: 1,
      openQuantity: 1,
      filledQuantity: 0,
      canceledQuantity: 0,
      side: 'Buy',
      orderType: 'Market',
      limitPrice: null,
      stopPrice: null,
      isAllOrNone: false,
      isAnonymous: false,
      icebergQuantity: null,
      minQuantity: null,
      avgExecPrice: null,
      lastExecPrice: null,
      source: 'API',
      timeInForce: 'Day',
      gtdDate: null,
      state: 'Pending',
      clientReasonStr: '',
      chainId: 0,
      creationTime: 't',
      updateTime: 't',
      notes: '',
      primaryRoute: 'R',
      secondaryRoute: 'R',
      orderRoute: 'R',
      venueHoldingOrder: 'V',
      commissionCharged: 0,
      exchangeOrderId: 'E',
      isSignificantShareholder: false,
      isInsider: false,
      isLimitOffsetInDollar: false,
      userId: 0,
      placementCommission: 0,
    });
    const resp = { orders: [ord] };
    expect(OrdersResponseSchema.parse(resp)).toEqual(resp);
    expect(AliasOrderResponseSchema.parse(resp)).toEqual(resp);
    expect(OrdersResponseAliasSchema.parse(resp)).toEqual(resp);
  });
  it('TimeResponseSchema parses', () => {
    expect(TimeResponseSchema.parse({ time: 't' })).toEqual({ time: 't' });
  });
  it('MarketsResponseSchema parses', () => {
    const m = MarketSchema.parse({
      name: 'N',
      tradingVenues: [],
      defaultTradingVenue: '',
      primaryOrderRoutes: [],
      secondaryOrderRoutes: [],
      level1Feeds: [],
      level2Feeds: [],
      extendedStartTime: '',
      startTime: '',
      endTime: '',
      extendedEndTime: '',
      currency: 'USD',
      snapQuotesLimit: 0,
    });
    expect(MarketsResponseSchema.parse({ markets: [m] })).toEqual({
      markets: [m],
    });
  });
  it('QuotesResponseSchema parses', () => {
    const q = QuoteSchema.parse({
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
    });
    expect(QuotesResponseSchema.parse({ quotes: [q] })).toEqual({
      quotes: [q],
    });
  });
  it('OptionQuotesResponseSchema parses', () => {
    const oq = OptionQuoteSchema.parse({
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
      underlying: '',
      underlyingId: 0,
      expiryDate: '',
      strikePrice: 0,
      optionType: '',
      volatility: null,
      delta: null,
      gamma: null,
      theta: null,
      vega: null,
      rho: null,
      openInterest: null,
    });
    expect(OptionQuotesResponseSchema.parse({ optionQuotes: [oq] })).toEqual({
      optionQuotes: [oq],
    });
  });
  it('StrategyQuotesResponseSchema parses', () => {
    const sq = StrategyQuoteSchema.parse({
      variantId: 1,
      bidPrice: null,
      askPrice: null,
      underlying: '',
      underlyingId: 0,
    });
    expect(
      StrategyQuotesResponseSchema.parse({ strategyQuotes: [sq] })
    ).toEqual({ strategyQuotes: [sq] });
  });
  it('CandlesResponseSchema parses', () => {
    const c = CandleSchema.parse({
      start: '',
      end: '',
      open: 1,
      high: 1,
      low: 1,
      close: 1,
      volume: 1,
    });
    expect(CandlesResponseSchema.parse({ candles: [c] })).toEqual({
      candles: [c],
    });
  });
  it('SymbolsResponseSchema parses', () => {
    const sd = SymbolDetailSchema.parse({
      symbol: '',
      symbolId: 0,
      prevDayClosePrice: 0,
      highPrice52: 0,
      lowPrice52: 0,
      averageVol3Months: 0,
      averageVol20Days: 0,
      outstandingShares: 0,
      eps: 0,
      pe: 0,
      dividend: 0,
      yield: 0,
      exDate: null,
      marketCap: 0,
      tradeUnit: 0,
      optionType: null,
      optionDurationType: null,
      optionRoot: '',
      optionContractDeliverables: { underlyings: [], cashInLieu: 0 },
      optionExerciseType: null,
      listingExchange: 'TSX',
      description: '',
      securityType: 'Stock',
      optionExpiryDate: null,
      dividendDate: null,
      optionStrikePrice: null,
      isTradable: false,
      isQuotable: false,
      hasOptions: false,
      minTicks: [],
      industrySector: '',
      industryGroup: '',
      industrySubGroup: '',
    });
    expect(SymbolsResponseSchema.parse({ symbols: [sd] })).toEqual({
      symbols: [sd],
    });
  });
  it('SymbolSearchResponseSchema parses', () => {
    const ss = SymbolSearchResultSchema.parse({
      symbol: '',
      symbolId: 0,
      description: '',
      securityType: 'Stock',
      listingExchange: 'TSX',
      isTradable: false,
      isQuotable: false,
    });
    expect(SymbolSearchResponseSchema.parse({ symbols: [ss] })).toEqual({
      symbols: [ss],
    });
  });
});
