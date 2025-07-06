// src/types/dev/symbols-search.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/symbols/search**
 *
 * @remarks
 * This module provides TypeScript request/response types and Zod schemas
 * for the Symbols Search endpoint, including detailed TSDoc on every member
 * for full IntelliSense coverage.
 */

import { z } from 'zod';
import type { CurrencyCode, ListingExchange, SecurityType } from './enums';
import { CURRENCY_CODES, LISTING_EXCHANGES, SECURITY_TYPES } from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shapes – Request Parameters
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Request parameters for the Symbols Search endpoint.
 */
export interface SymbolsSearchRequest {
  /**
   * @remarks
   * Prefix or any word in the symbol description to search for.
   */
  prefix: string;

  /**
   * @remarks
   * Offset in number of records from the start of the result set.
   * Defaults to 0 if omitted.
   */
  offset?: number;
}

/**
 * @public
 * Zod schema validating SymbolsSearchRequest parameters.
 */
export const SymbolsSearchRequestSchema = z.object({
  prefix: z.string().min(1),
  offset: z.number().int().nonnegative().optional(),
});

//──────────────────────────────────────────────────────────────────────────────
// 2. Output Shapes – Response Structures
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Represents a single symbol returned by the search endpoint.
 */
export interface EquitySymbol {
  /**
   * @remarks
   * Symbol name in Questrade symbology (e.g., "AAPL").
   */
  symbol: string;

  /**
   * @remarks
   * Unique internal symbol identifier.
   */
  symbolId: number;

  /**
   * @remarks
   * Descriptive name of the security.
   */
  description: string;

  /**
   * @remarks
   * Security classification (e.g., Stock, Option).
   */
  securityType: SecurityType;

  /**
   * @remarks
   * Primary listing exchange code.
   */
  listingExchange: ListingExchange;

  /**
   * @remarks
   * Whether the symbol can be quoted (live market data available).
   */
  isQuotable: boolean;

  /**
   * @remarks
   * Whether the symbol is tradable on the platform.
   */
  isTradable: boolean;

  /**
   * @remarks
   * ISO currency code for the symbol.
   */
  currency: CurrencyCode;
}

/**
 * @public
 * Zod schema for validating an EquitySymbol.
 */
export const EquitySymbolSchema = z.object({
  symbol: z.string().min(1),
  symbolId: z.number().int().positive(),
  description: z.string().min(1),
  securityType: z.enum(SECURITY_TYPES),
  listingExchange: z.enum(LISTING_EXCHANGES),
  isQuotable: z.boolean(),
  isTradable: z.boolean(),
  currency: z.enum(CURRENCY_CODES),
});

/**
 * @public
 * Response envelope for GET /v1/symbols/search.
 */
export interface SymbolsSearchResponse {
  /**
   * @remarks
   * List of matching symbols.
   */
  symbols: EquitySymbol[];
}

/**
 * @public
 * Zod schema for validating SymbolsSearchResponse.
 */
export const SymbolsSearchResponseSchema = z.object({
  symbols: z.array(EquitySymbolSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `SymbolsSearchResponse`.
 *
 * @param json - The raw API response payload.
 * @returns Validated search response object.
 * @throws ZodError if the payload does not match schema.
 */
export const parseSymbolsSearchResponse = SymbolsSearchResponseSchema.parse;
