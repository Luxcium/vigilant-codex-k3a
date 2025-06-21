import { z } from 'zod';
import {
  ListingExchange,
  ListingExchangeSchema,
  OptionType,
  OptionDurationType,
  OptionExerciseType,
  SecurityType,
  OptionTypeSchema,
  OptionDurationTypeSchema,
  OptionExerciseTypeSchema,
  SecurityTypeSchema
} from './enums';

/** Underlying deliverable component */
export interface OptionDeliverable {
  underlyingSymbol: string;
  underlyingSymbolId: number;
  multiplier: number;
}

/** Minimum tick info */
export interface MinTick {
  pivot: number;
  minTick: number;
}

/** Option deliverables grouping */
export interface OptionDeliverables {
  underlyings: OptionDeliverable[];
  cashInLieu: number;
}

/** Detailed symbol information */
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

/** Zod schema for {@link SymbolDetail} */
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
  optionContractDeliverables: OptionDeliverablesSchema,
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
  minTicks: z.array(z.object({ pivot: z.number(), minTick: z.number() })),
  industrySector: z.string(),
  industryGroup: z.string(),
  industrySubGroup: z.string()
});

/** Result from symbol search */
export interface SymbolSearchResult {
  symbol: string;
  symbolId: number;
  description: string;
  securityType: SecurityType;
  listingExchange: ListingExchange;
  isTradable: boolean;
  isQuotable: boolean;
}

/** Zod schema for {@link SymbolSearchResult} */
export const SymbolSearchResultSchema = z.object({
  symbol: z.string(),
  symbolId: z.number().int(),
  description: z.string(),
  securityType: SecurityTypeSchema,
  listingExchange: ListingExchangeSchema,
  isTradable: z.boolean(),
  isQuotable: z.boolean()
});

/** Option chain structures */
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

/** Zod schema for {@link OptionChain} */
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
