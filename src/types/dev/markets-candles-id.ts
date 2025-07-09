// src/types/dev/markets-candles-id.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/markets/candles/:id**
 *
 * @remarks
 * Provides strongly‑typed request/response structures and Zod validation for
 * retrieving historical OHLCV candlestick data (up to 2 000 records per call)
 * from Questrade.
 */

import { z } from 'zod';
import { CandleIntervalSchema } from './enums';
import type { CandleInterval } from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – Request Parameters
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Request parameters for historical candlesticks of a single symbol.
 */
export interface MarketsCandlesRequest {
  /** Internal symbol identifier (positive integer, path param). */
  id: number;
  /** ISO‑8601 timestamp for the first candle (inclusive). */
  startTime: string;
  /** ISO‑8601 timestamp for the last candle (exclusive). */
  endTime: string;
  /** Timeframe of each candlestick. */
  interval: CandleInterval;
}

/**
 * @public
 * Zod schema validating the request parameters.
 */
export const MarketsCandlesRequestSchema = z.object({
  id: z.number().int().positive(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  interval: CandleIntervalSchema,
});

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Candle Record
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * One OHLCV candlestick.
 */
export interface Candle {
  /** Candle start timestamp (ISO‑8601). */
  start: string;
  /** Candle end timestamp (ISO‑8601). */
  end: string;
  /** Opening price. */
  open: number;
  /** Highest price within interval. */
  high: number;
  /** Lowest price within interval. */
  low: number;
  /** Closing price. */
  close: number;
  /** Traded volume. */
  volume: number;
}

/**
 * @public
 * Zod schema for a Candle.
 */
export const CandleSchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number().int().nonnegative(),
});

/**
 * @public
 * Response envelope for the candlestick endpoint.
 */
export interface MarketsCandlesResponse {
  /** List of candlesticks for the requested range. */
  candles: Candle[];
}

/**
 * @public
 * Zod schema validating the response envelope.
 */
export const MarketsCandlesResponseSchema = z.object({
  candles: z.array(CandleSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `MarketsCandlesResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated response object.
 * @throws ZodError if validation fails.
 *
 * @example
 * ```ts
 * const data = await fetchJson('/v1/markets/candles/38738?...');
 * const resp = parseMarketsCandlesResponse(data);
 * console.log(resp.candles[0].open);
 * ```
 */
export const parseMarketsCandlesResponse = MarketsCandlesResponseSchema.parse;
