import { describe, expect, it } from 'vitest';
import {
  OptionDeliverableSchema,
  MinTickSchema,
  OptionDeliverablesSchema,
  SymbolDetailSchema,
  SymbolSearchResultSchema,
  OptionChainSchema,
} from '../../../src/types/symbols';

describe('Symbols related schemas', () => {
  it('valid OptionDeliverableSchema parses', () => {
    const obj = {
      underlyingSymbol: 'U',
      underlyingSymbolId: 1,
      multiplier: 100,
    };
    expect(OptionDeliverableSchema.parse(obj)).toEqual(obj);
  });
  it('valid MinTickSchema parses', () => {
    const obj = { pivot: 1, minTick: 0.1 };
    expect(MinTickSchema.parse(obj)).toEqual(obj);
  });
  it('valid OptionDeliverablesSchema parses', () => {
    const obj = {
      underlyings: [
        OptionDeliverableSchema.parse({
          underlyingSymbol: 'U',
          underlyingSymbolId: 1,
          multiplier: 1,
        }),
      ],
      cashInLieu: 0,
    };
    expect(OptionDeliverablesSchema.parse(obj)).toEqual(obj);
  });
  it('valid SymbolDetailSchema parses', () => {
    const obj = {
      symbol: 'S',
      symbolId: 1,
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
      tradeUnit: 1,
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
    };
    expect(SymbolDetailSchema.parse(obj)).toEqual(obj);
  });
  it('valid SymbolSearchResultSchema parses', () => {
    const obj = {
      symbol: 'S',
      symbolId: 1,
      description: '',
      securityType: 'Stock',
      listingExchange: 'TSX',
      isTradable: false,
      isQuotable: false,
    };
    expect(SymbolSearchResultSchema.parse(obj)).toEqual(obj);
  });
  it('valid OptionChainSchema parses', () => {
    const obj = {
      options: [
        {
          expiryDate: 'd',
          description: 'd',
          listingExchange: 'TSX',
          optionExerciseType: 'American',
          chainPerRoot: [],
        },
      ],
    };
    expect(OptionChainSchema.parse(obj)).toEqual(obj);
  });
});
