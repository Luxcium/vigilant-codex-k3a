/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/symbols/:id**
 * (src/types/dev/symbols-id.ts)
 *
 * @remarks
 * This module provides TypeScript types and Zod schemas for the Symbol Details
 * endpoint, including detailed TSDoc on every member for IntelliSense.
 */

import { z } from 'zod';
import {
  CURRENCY_CODES,
  CurrencyCode,
  LISTING_EXCHANGES,
  ListingExchange,
  OPTION_DURATION_TYPES,
  OPTION_EXERCISE_TYPES,
  OPTION_TYPES,
  OptionDurationType,
  OptionExerciseType,
  OptionType,
  SECURITY_TYPES,
  SecurityType,
} from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shapes – Request Variants
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Request parameters for the Symbol Details endpoint.
 */
export interface SymbolDetailsByIdRequest {
  /**
   * @remarks
   * Variant discriminant indicating single-ID request.
   */
  variant: 'byId';

  /**
   * @remarks
   * Internal symbol identifier (positive integer).
   */
  id: number;
}

/**
 * @public
 * Request parameters for multiple symbol IDs.
 */
export interface SymbolDetailsByIdsRequest {
  /**
   * @remarks
   * Variant discriminant indicating multi-ID request.
   */
  variant: 'byIds';

  /**
   * @remarks
   * Array of internal symbol identifiers.
   */
  ids: number[];
}

/**
 * @public
 * Request parameters for symbol names.
 */
export interface SymbolDetailsByNamesRequest {
  /**
   * @remarks
   * Variant discriminant indicating name-based request.
   */
  variant: 'byNames';

  /**
   * @remarks
   * Array of symbol names (e.g., "AAPL", "TD.TO").
   */
  names: string[];
}

/**
 * @public
 * Union type covering all valid request shapes.
 *
 * @remarks
 * Exactly one of the variants must be provided.
 */
export type SymbolDetailsRequest =
  | SymbolDetailsByIdRequest
  | SymbolDetailsByIdsRequest
  | SymbolDetailsByNamesRequest;

/**
 * @public
 * Zod schema validating the request discriminated union.
 */
export const SymbolDetailsRequestSchema = z.discriminatedUnion('variant', [
  z.object({ variant: z.literal('byId'), id: z.number().int().positive() }),
  z.object({
    variant: z.literal('byIds'),
    ids: z.array(z.number().int().positive()).nonempty(),
  }),
  z.object({
    variant: z.literal('byNames'),
    names: z.array(z.string().min(1)).nonempty(),
  }),
]);

//──────────────────────────────────────────────────────────────────────────────
// 2. Output Shapes – Response Structures
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Full details for a single symbol returned by the API.
 */
export interface SymbolDetail {
  /** @remarks Questrade symbology (e.g., "TD.TO"). */
  symbol: string;

  /** @remarks Unique internal symbol ID. */
  symbolId: number;

  /** @remarks Closing price from the previous trading day. */
  prevDayClosePrice: number;

  /** @remarks 52-week high price. */
  highPrice52: number;

  /** @remarks 52-week low price. */
  lowPrice52: number;

  /** @remarks Average trading volume over the past 3 months. */
  averageVol3Months: number;

  /** @remarks Average trading volume over the past 20 days. */
  averageVol20Days: number;

  /** @remarks Total shares outstanding. */
  outstandingShares: number;

  /** @remarks Trailing 12-month earnings per share. */
  eps: number;

  /** @remarks Trailing 12-month price-to-earnings ratio. */
  pe: number;

  /** @remarks Dividend amount paid per share. */
  dividend: number;

  /** @remarks Dividend yield (dividend / prevDayClosePrice). */
  yield: number;

  /** @remarks Dividend ex-date, ISO 8601 string. */
  exDate: string;

  /** @remarks Market capitalization (outstandingShares × prevDayClosePrice). */
  marketCap: number;

  /** @remarks Board-lot or contract size (typically 1). */
  tradeUnit: number;

  /** @remarks Option type if applicable (Call/Put). */
  optionType: OptionType | null;

  /** @remarks Option expiration cycle if applicable. */
  optionDurationType: OptionDurationType | null;

  /** @remarks Root symbol for options, if applicable. */
  optionRoot: string | null;

  /** @remarks Raw deliverables data (to be defined). */
  optionContractDeliverables: unknown;

  /** @remarks Exercise style for options. */
  optionExerciseType: OptionExerciseType | null;

  /** @remarks Primary exchange where the symbol is listed. */
  listingExchange: ListingExchange;

  /** @remarks Descriptive name of the security. */
  description: string;

  /** @remarks Security classification (Stock, Option, etc.). */
  securityType: SecurityType;

  /** @remarks Option expiry date if applicable, ISO 8601 string. */
  optionExpiryDate: string | null;

  /** @remarks Dividend declaration date, ISO 8601 string. */
  dividendDate: string | null;

  /** @remarks Strike price for options if applicable. */
  optionStrikePrice: number | null;

  /** @remarks Whether the symbol can be traded. */
  isTradable: boolean;

  /** @remarks Whether the symbol can be quoted. */
  isQuotable: boolean;

  /** @remarks Whether the symbol has listed options. */
  hasOptions: boolean;

  /** @remarks Currency code, ISO 4217. */
  currency: CurrencyCode;

  /** @remarks Tick size rules: pivot → minTick. */
  minTicks: { pivot: number; minTick: number }[];

  /** @remarks Industry sector classification (free-form). */
  industrySector: string | null;

  /** @remarks Industry group classification (free-form). */
  industryGroup: string | null;

  /** @remarks Industry subgroup classification (free-form). */
  industrySubGroup: string | null;
}

/**
 * @public
 * Zod schema for validating SymbolDetail objects.
 */
export const SymbolDetailSchema = z.object({
  symbol: z.string().min(1),
  symbolId: z.number().int().positive(),
  prevDayClosePrice: z.number(),
  highPrice52: z.number(),
  lowPrice52: z.number(),
  averageVol3Months: z.number().int().nonnegative(),
  averageVol20Days: z.number().int().nonnegative(),
  outstandingShares: z.number().int().nonnegative(),
  eps: z.number(),
  pe: z.number(),
  dividend: z.number(),
  yield: z.number(),
  exDate: z.string().datetime(),
  marketCap: z.number(),
  tradeUnit: z.number().int().positive(),
  optionType: z.enum(OPTION_TYPES).nullable(),
  optionDurationType: z.enum(OPTION_DURATION_TYPES).nullable(),
  optionRoot: z.string().nullable(),
  optionContractDeliverables: z.unknown(),
  optionExerciseType: z.enum(OPTION_EXERCISE_TYPES).nullable(),
  listingExchange: z.enum(LISTING_EXCHANGES),
  description: z.string().min(1),
  securityType: z.enum(SECURITY_TYPES),
  optionExpiryDate: z.string().nullable(),
  dividendDate: z.string().nullable(),
  optionStrikePrice: z.number().nullable(),
  isTradable: z.boolean(),
  isQuotable: z.boolean(),
  hasOptions: z.boolean(),
  currency: z.enum(CURRENCY_CODES),
  minTicks: z.array(
    z.object({ pivot: z.number(), minTick: z.number().positive() })
  ),
  industrySector: z.string().nullable(),
  industryGroup: z.string().nullable(),
  industrySubGroup: z.string().nullable(),
});

/**
 * @public
 * Response envelope for the Symbol Details endpoint.
 */
export interface SymbolDetailsResponse {
  /** @remarks Array of symbol detail objects. */
  symbols: SymbolDetail[];
}

/**
 * @public
 * Schema validating the full response envelope.
 */
export const SymbolDetailsResponseSchema = z.object({
  symbols: z.array(SymbolDetailSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `SymbolDetailsResponse`.
 *
 * @param json - The raw response payload.
 * @returns Validated response object.
 * @throws ZodError on schema mismatch.
 */
export const parseSymbolDetailsResponse = SymbolDetailsResponseSchema.parse;
