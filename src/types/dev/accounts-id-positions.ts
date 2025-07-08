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
  symbol: string /** Position symbol. */;
  symbolId: number /** Internal symbol identifier. */;
  openQuantity: number /** Shares/contracts still open. */;
  closedQuantity: number /** Portion closed today. */;
  currentMarketValue: number /** Market value (qty × price). */;
  currentPrice: number /** Current market price. */;
  averageEntryPrice: number /** Average acquisition price. */;
  closedPnL: number /** Realized profit/loss. */;
  openPnL: number /** Unrealized profit/loss. */;
  totalCost: number /** Aggregate cost basis. */;
  isRealTime: boolean /** Whether PnL uses real‑time quote. */;
  isUnderReorg: boolean /** Symbol under corporate reorg flag. */;
}

/** Zod schema for Position. */
export const PositionSchema = z.object({
  symbol: z.string().min(1),
  symbolId: z.number().int().positive(),
  openQuantity: z.number(),
  closedQuantity: z.number(),
  currentMarketValue: z.number(),
  currentPrice: z.number(),
  averageEntryPrice: z.number(),
  closedPnL: z.number(),
  openPnL: z.number(),
  totalCost: z.number(),
  isRealTime: z.boolean(),
  isUnderReorg: z.boolean(),
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

/** Zod schema for the envelope. */
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
