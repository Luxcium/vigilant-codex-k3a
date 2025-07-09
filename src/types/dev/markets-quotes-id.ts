// src/types/dev/markets-quotes-id.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/markets/quotes/:id**
 * (src/types/dev/markets-quotes-id.ts)
 *
 * @remarks
 * This module provides TypeScript request/response types and Zod schemas
 * for the Level 1 market data quotes endpoint, including detailed TSDoc on
 * every member for IntelliSense and runtime validation.
 */

import { z } from 'zod';
import type { TickType } from './enums';
import { TICK_TYPES } from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shapes – Request Variants
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Request parameters for Level 1 market quotes.
 */
export interface MarketQuotesByIdRequest {
  /** Variant for a single-symbol request via path `/markets/quotes/:id`. */
  variant: 'byId';

  /** Internal symbol identifier (positive integer). */
  id: number;
}

/**
 * @public
 * Request parameters for Level 1 market quotes for multiple symbols.
 */
export interface MarketQuotesByIdsRequest {
  /** Variant for multi-symbol request via query `?ids=`. */
  variant: 'byIds';

  /** Array of internal symbol identifiers. */
  ids: number[];
}

/**
 * @public
 * Union of valid market quotes request shapes.
 *
 * Exactly one variant must be provided.
 */
export type MarketQuotesRequest =
  | MarketQuotesByIdRequest
  | MarketQuotesByIdsRequest;

/**
 * @public
 * Zod schema validating the MarketQuotesRequest discriminated union.
 */
export const MarketQuotesRequestSchema = z.discriminatedUnion('variant', [
  z.object({ variant: z.literal('byId'), id: z.number().int().positive() }),
  z.object({
    variant: z.literal('byIds'),
    ids: z.array(z.number().int().positive()).nonempty(),
  }),
]);

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Quote Record
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * A single Level 1 market quote.
 */
export interface Quote {
  /** Symbol name in Questrade symbology. */
  symbol: string;

  /** Internal symbol identifier. */
  symbolId: number;

  /** Market tier (may be empty when unspecified). */
  tier: string | null;

  /** Current bid price. */
  bidPrice: number;

  /** Quantity at the bid price. */
  bidSize: number;

  /** Current ask price. */
  askPrice: number;

  /** Quantity at the ask price. */
  askSize: number;

  /** Last trade price during regular trading hours. */
  lastTradePriceTrHrs: number;

  /** Price of the last trade. */
  lastTradePrice: number;

  /** Quantity of the last trade. */
  lastTradeSize: number;

  /** Direction of the last trade (Up, Down, Equal). */
  lastTradeTick: TickType;

  /** Timestamp of the last trade in ISO-8601 format. */
  lastTradeTime: string;

  /** Total traded volume for the day. */
  volume: number;

  /** Opening price of the trading day. */
  openPrice: number;

  /** Highest price of the trading day. */
  highPrice: number;

  /** Lowest price of the trading day. */
  lowPrice: number;

  /** Whether this quote is delayed (true) or real-time (false). */
  delay: boolean | number;

  /** Whether trading in this symbol is halted. */
  isHalted: boolean;
}

/**
 * @public
 * Zod schema for validating a Quote record.
 */
export const QuoteSchema = z.object({
  symbol: z.string().min(1),
  symbolId: z.number().int().positive(),
  tier: z.union([z.string().min(1), z.literal('')]).nullable(),
  bidPrice: z.number(),
  bidSize: z.number().int().nonnegative(),
  askPrice: z.number(),
  askSize: z.number().int().nonnegative(),
  lastTradePriceTrHrs: z.number(),
  lastTradePrice: z.number(),
  lastTradeSize: z.number().int().nonnegative(),
  lastTradeTick: z.enum(TICK_TYPES),
  lastTradeTime: z.string().datetime(),
  volume: z.number().int().nonnegative(),
  openPrice: z.number(),
  highPrice: z.number(),
  lowPrice: z.number(),
  delay: z.union([z.boolean(), z.number().int()]),
  isHalted: z.boolean(),
});

/**
 * @public
 * Response envelope for GET /v1/markets/quotes/:id.
 */
export interface MarketQuotesResponse {
  /** Array of Level 1 quotes. */
  quotes: Quote[];
}

/**
 * @public
 * Zod schema for validating MarketQuotesResponse.
 */
export const MarketQuotesResponseSchema = z.object({
  quotes: z.array(QuoteSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `MarketQuotesResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated market quotes response.
 * @throws ZodError if the payload does not match schema.
 *
 * @example
 * ```ts
 * const resp = parseMarketQuotesResponse(apiData);
 * console.log(resp.quotes[0].symbol);
 * ```
 */
export const parseMarketQuotesResponse = MarketQuotesResponseSchema.parse;
