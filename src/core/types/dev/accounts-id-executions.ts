// src/types/dev/accounts-id-executions.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/accounts/:id/executions**
 *
 * @remarks
 * Provides request/response typings and Zod validation for retrieving trade
 * executions in a specified brokerage account over a time range. Uses shared
 * enum schemas to avoid duplication.
 */

import { z } from 'zod';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – Request Parameters
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Request parameters for retrieving account executions.
 */
export interface AccountExecutionsRequest {
  /** Eight-digit account number (path parameter). */
  id: string;
  /** ISO-8601 start of time range (inclusive). */
  startTime?: string;
  /** ISO-8601 end of time range (inclusive). */
  endTime?: string;
}

/**
 * @public
 * Zod schema validating the request parameters.
 */
export const AccountExecutionsRequestSchema = z.object({
  id: z.string().regex(/^\d{8}$/),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Execution Record
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Details of a single trade execution.
 */
export interface Execution {
  /** Symbol of the executed security. */
  symbol: string;
  /** Internal symbol identifier. */
  symbolId: number;
  /** Number of shares/contracts executed. */
  quantity: number;
  /** Client side of the order (Buy, Sell, etc.). */
  side: string;
  /** Execution price. */
  price: number;
  /** Internal execution identifier. */
  id: number;
  /** Internal identifier of the related order. */
  orderId: number;
  /** Internal identifier of the order chain. */
  orderChainId: number;
  /** Market-provided execution identifier. */
  exchangeExecId: string;
  /** Timestamp of the execution (ISO-8601). */
  timestamp: string;
  /** Manual notes entered by Trade Desk staff, if any. */
  notes?: string;
  /** Venue where the execution originated. */
  venue: string;
  /** Total execution cost (price × quantity). */
  totalCost: number;
  /** Commission charged for order placement. */
  orderPlacementCommission?: number;
  /** Questrade commission on execution. */
  commission?: number;
  /** Liquidity fee charged by venue. */
  executionFee?: number;
  /** SEC fee on U.S. sales. */
  secFee?: number;
  /** TSX additional execution fee. */
  canadianExecutionFee?: number;
  /** Parent order identifier, if applicable. */
  parentId?: number;
  /** Whether real-time data was used. */
  isRealTime: boolean;
  /** Whether a symbol is under corporate reorganization. */
  isUnderReorg: boolean;
}

/**
 * @public
 * Zod schema for validating an Execution record.
 */
export const ExecutionSchema = z.object({
  symbol: z.string().min(1),
  symbolId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  side: z.string().min(1),
  price: z.number(),
  id: z.number().int().positive(),
  orderId: z.number().int().positive(),
  orderChainId: z.number().int().positive(),
  exchangeExecId: z.string().min(1),
  timestamp: z.string().datetime(),
  notes: z.string().optional(),
  venue: z.string().min(1),
  totalCost: z.number(),
  orderPlacementCommission: z.number().optional(),
  commission: z.number().optional(),
  executionFee: z.number().optional(),
  secFee: z.number().optional(),
  canadianExecutionFee: z.number().optional(),
  parentId: z.number().int().positive().optional(),
  isRealTime: z.boolean(),
  isUnderReorg: z.boolean(),
});

//──────────────────────────────────────────────────────────────────────────────
// 3. Response Envelope & Helper
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Response envelope for GET /v1/accounts/:id/executions.
 */
export interface AccountExecutionsResponse {
  /** Array of execution records for the account. */
  executions: Execution[];
}

/**
 * @public
 * Zod schema for validating the response envelope.
 */
export const AccountExecutionsResponseSchema = z.object({
  executions: z.array(ExecutionSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `AccountExecutionsResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated executions response object.
 * @throws ZodError if validation fails.
 */
export const parseAccountExecutionsResponse =
  AccountExecutionsResponseSchema.parse;
