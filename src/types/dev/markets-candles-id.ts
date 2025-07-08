/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/markets/candles/:id**
 *
 * @remarks
 * Provides strongly-typed request/response structures and Zod validation for
 * retrieving historical OHLCV candlestick data (up to 2 000 records per call)
 * from Questrade.
 */

import { z } from 'zod';
import { CandleIntervalSchema } from '../enums';
import type { CandleInterval } from '../enums';

// ──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – Request Parameters
// ──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Request parameters for historical candlesticks of a single symbol.
 */
export interface MarketsCandlesRequest {
  /** @remarks Internal symbol identifier (positive integer, path param). */
  id: number;
  /** @remarks ISO‑8601 timestamp for the first candle (inclusive). */
  startTime: string;
  /** @remarks ISO‑8601 timestamp for the last candle (exclusive). */
  endTime: string;
  /** @remarks Timeframe of each candlestick. */
  interval: CandleInterval;
}

/** Zod schema validating the request parameters. */
export const MarketsCandlesRequestSchema = z.object({
  id: z.number().int().positive(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  interval: CandleIntervalSchema,
});

// ──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Candle Record
// ──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * One OHLCV candlestick.
 */
export interface Candle {
  start: string /** Candle start timestamp (ISO 8601). */;
  end: string /** Candle end timestamp   (ISO 8601). */;
  open: number /** Opening price. */;
  high: number /** Highest price within interval. */;
  low: number /** Lowest price within interval. */;
  close: number /** Closing price. */;
  volume: number /** Traded volume. */;
}

/** Zod schema for a Candle. */
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
  /** @remarks List of candlesticks for the requested range. */
  candles: Candle[];
}

/** Zod schema validating the response envelope. */
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
 */
export const parseMarketsCandlesResponse = MarketsCandlesResponseSchema.parse;
