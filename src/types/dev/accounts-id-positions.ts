// src/types/dev/accounts-id-positions.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/accounts/:id/positions**
 *
 * @remarks
 * Provides request/response typings and Zod validation for retrieving open and
 * closed positions in a specific brokerage account.
 */

import { z } from 'zod';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – Request Parameters
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Request parameters for the positions endpoint.
 */
export interface AccountPositionsRequest {
  /** @remarks The eight‑digit account number (path parameter). */
  id: string;
}

/**
 * @public
 * Zod schema for validating AccountPositionsRequest.
 */
export const AccountPositionsRequestSchema = z.object({
  id: z.string().regex(/^\d{8}$/),
});

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Position Record
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * A single open/closed position in the account.
 */
export interface Position {
  /** @remarks Position symbol (e.g., "AAPL"). */
  symbol: string;
  /** @remarks Internal symbol identifier. */
  symbolId: number;
  /** @remarks Quantity remaining open. */
  openQuantity: number;
  /** @remarks Portion of the position closed today. */
  closedQuantity?: number;
  /** @remarks Market value of the position (qty × price). */
  currentMarketValue?: number;
  /** @remarks Current market price. */
  currentPrice?: number;
  /** @remarks Average price paid. */
  averageEntryPrice?: number;
  /** @remarks Realized profit/loss. */
  closedPnl?: number;
  /** @remarks Unrealized profit/loss. */
  openPnl?: number;
  /** @remarks Aggregate cost basis. */
  totalCost?: number | boolean;
  /** @remarks Whether real-time quote was used. */
  isRealTime?: boolean | string;
  /** @remarks Symbol under corporate reorg flag. */
  isUnderReorg?: boolean;
}

/**
 * @public
 * Zod schema for Position.
 */
export const PositionSchema = z.object({
  symbol: z.string().min(1),
  symbolId: z.number().int().positive(),
  openQuantity: z.number(),
  closedQuantity: z.number().optional(),
  currentMarketValue: z.number().optional(),
  currentPrice: z.number().optional(),
  averageEntryPrice: z.number().optional(),
  closedPnl: z.number().optional(),
  openPnl: z.number().optional(),
  totalCost: z.union([z.number(), z.boolean()]).optional(),
  isRealTime: z.union([z.boolean(), z.string()]).optional(),
  isUnderReorg: z.boolean().optional(),
});

//──────────────────────────────────────────────────────────────────────────────
// 3. Response Envelope & Helper
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Response envelope for account positions.
 */
export interface AccountPositionsResponse {
  /** @remarks Array of position records in the account. */
  positions: Position[];
}

/**
 * @public
 * Zod schema for the envelope.
 */
export const AccountPositionsResponseSchema = z.object({
  positions: z.array(PositionSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `AccountPositionsResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated response object.
 * @throws ZodError if validation fails.
 */
export const parseAccountPositionsResponse =
  AccountPositionsResponseSchema.parse;
