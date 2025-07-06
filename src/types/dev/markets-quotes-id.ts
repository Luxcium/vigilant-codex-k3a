// src/types/dev/markets-quotes-id.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/markets/quotes/:id**
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
  /**
   * @remarks
   * Variant indicating a single-symbol request via path `/markets/quotes/:id`.
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
 * Request parameters for Level 1 market quotes for multiple symbols.
 */
export interface MarketQuotesByIdsRequest {
  /**
   * @remarks
   * Variant indicating a multi-symbol request via query `?ids=`.
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
 * Union type covering both single- and multi-symbol quote requests.
 *
 * @remarks
 * Exactly one of `byId` or `byIds` must be provided to satisfy the API.
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
  /** @remarks Symbol name in Questrade symbology. */
  symbol: string;

  /** @remarks Internal symbol identifier. */
  symbolId: number;

  /** @remarks Market tier (e.g., "Tier1"). */
  tier: string;

  /** @remarks Current bid price. */
  bidPrice: number;

  /** @remarks Quantity at the bid price. */
  bidSize: number;

  /** @remarks Current ask price. */
  askPrice: number;

  /** @remarks Quantity at the ask price. */
  askSize: number;

  /** @remarks Last trade price during regular trading hours. */
  astTradeTrHrs: number;

  /** @remarks Price of the last trade. */
  lastTradePrice: number;

  /** @remarks Quantity of the last trade. */
  lastTradeSize: number;

  /** @remarks Direction of the last trade (Up, Down, Equal). */
  lastTradeTick: TickType;

  /** @remarks Total traded volume for the day. */
  volume: number;

  /** @remarks Opening price of the trading day. */
  openPrice: number;

  /** @remarks Highest price of the trading day. */
  highPrice: number;

  /** @remarks Lowest price of the trading day. */
  lowPrice: number;

  /** @remarks Whether this quote is delayed (`true`) or real-time (`false`). */
  delay: boolean;

  /** @remarks Whether trading in this symbol is halted. */
  isHalted: boolean;
}

/**
 * @public
 * Zod schema for validating a Quote record.
 */
export const QuoteSchema = z.object({
  symbol: z.string().min(1),
  symbolId: z.number().int().positive(),
  tier: z.string().min(1),
  bidPrice: z.number(),
  bidSize: z.number().int().nonnegative(),
  askPrice: z.number(),
  askSize: z.number().int().nonnegative(),
  astTradeTrHrs: z.number(),
  lastTradePrice: z.number(),
  lastTradeSize: z.number().int().nonnegative(),
  lastTradeTick: z.enum(TICK_TYPES),
  volume: z.number().int().nonnegative(),
  openPrice: z.number(),
  highPrice: z.number(),
  lowPrice: z.number(),
  delay: z.boolean(),
  isHalted: z.boolean(),
});

/**
 * @public
 * Response envelope for GET /v1/markets/quotes/:id.
 */
export interface MarketQuotesResponse {
  /** @remarks Array of Level 1 quotes. */
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
 */
export const parseMarketQuotesResponse = MarketQuotesResponseSchema.parse;
