// src/types/dev/markets.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/markets**
 *
 * @remarks
 * This module provides TypeScript types and Zod schemas for the Markets
 * endpoint, including detailed TSDoc on every member for IntelliSense and
 * runtime validation.
 */

import { z } from 'zod';
import type { CurrencyCode, ListingExchange } from './enums';
import { CURRENCY_CODES, LISTING_EXCHANGES } from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – No parameters for GET /v1/markets
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * No parameters are required or allowed for the Markets endpoint.
 */
export type MarketsRequest = Record<string, never>;

/**
 * @public
 * Zod schema validating an empty request object for Markets.
 */
export const MarketsRequestSchema = z.object({}).strict();

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Market Information Structures
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Details of a single market, including trading venues, routing,
 * feed codes, session times, and currency.
 */
export interface Market {
  /** @remarks Market name (e.g., "TSX"). */
  name: string;

  /** @remarks Supported trading venue codes. */
  tradingVenues: ListingExchange[];

  /** @remarks Default trading venue code. */
  defaultTradingVenue: ListingExchange;

  /** @remarks Primary order route codes (free-form, evolving). */
  primaryOrderRoutes: string[];

  /** @remarks Secondary order route codes (free-form, evolving). */
  secondaryOrderRoutes: string[];

  /** @remarks Level 1 market data feed codes (free-form). */
  level1Feeds: string[];

  /** @remarks Level 2 market data feed codes (free-form). */
  level2Feeds: string[];

  /** @remarks Pre-market opening time (ISO-8601 string). */
  extendedStartTime: string;

  /** @remarks Regular market opening time (ISO-8601 string). */
  startTime: string;

  /** @remarks Regular market closing time (ISO-8601 string). */
  endTime: string;

  /** @remarks Extended market closing time (ISO-8601 string). */
  extendedEndTime: string;

  /** @remarks Currency code in ISO-4217 format. */
  currency: CurrencyCode;

  /** @remarks Maximum number of snap quotes retrievable. */
  snapQuotesLimit: number;
}

/**
 * @public
 * Zod schema for validating a Market object.
 */
export const MarketSchema = z.object({
  name: z.string().min(1),
  tradingVenues: z.array(z.enum(LISTING_EXCHANGES)).nonempty(),
  defaultTradingVenue: z.enum(LISTING_EXCHANGES),
  primaryOrderRoutes: z.array(z.string()).nonempty(),
  secondaryOrderRoutes: z.array(z.string()).nonempty(),
  level1Feeds: z.array(z.string()).nonempty(),
  level2Feeds: z.array(z.string()).optional(),
  extendedStartTime: z.string().datetime(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  extendedEndTime: z.string().datetime(),
  currency: z.enum(CURRENCY_CODES),
  snapQuotesLimit: z.number().int().nonnegative(),
});

/**
 * @public
 * Response envelope for GET /v1/markets.
 */
export interface MarketsResponse {
  /** @remarks List of supported markets. */
  markets: Market[];
}

/**
 * @public
 * Zod schema for validating MarketsResponse.
 */
export const MarketsResponseSchema = z.object({
  markets: z.array(MarketSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `MarketsResponse`.
 *
 * @param json – Raw API response payload.
 * @returns Validated markets response object.
 * @throws ZodError if the payload does not match schema.
 */
export const parseMarketsResponse = MarketsResponseSchema.parse;
