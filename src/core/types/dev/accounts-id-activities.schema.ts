// src/types/dev/accounts-id-activities.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/accounts/:id/activities**
 *
 * @remarks
 * Provides TypeScript types and Zod schemas for retrieving account activities
 * (trades, cash transactions, dividends, etc.) within a specified time range.
 */

import { z } from 'zod';
import { CURRENCY_CODES } from './enums';
import type { CurrencyCode } from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – Request Parameters
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Request parameters for the activities endpoint.
 */
export interface AccountActivitiesRequest {
  /** Eight-digit account number (path parameter). */
  id: string;
  /** ISO-8601 start of time range (inclusive). */
  startTime?: string;
  /** ISO-8601 end of time range (inclusive). */
  endTime?: string;
}

/**
 * @public
 * Zod schema validating AccountActivitiesRequest.
 */
export const AccountActivitiesRequestSchema = z.object({
  id: z.string().regex(/^\d{8}$/),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – AccountActivity Record
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * An individual account activity entry.
 */
export interface AccountActivity {
  tradeDate?: string /** Trade date. */;
  transactionDate?: string /** Transaction date. */;
  settlementDate?: string /** Settlement date. */;
  action: string /** Activity action. */;
  symbol?: string /** Symbol name. */;
  symbolId?: number /** Symbol identifier. */;
  description?: string /** Description. */;
  currency: CurrencyCode | string /** Currency code. */;
  quantity?: number /** Quantity. */;
  price?: number /** Price. */;
  grossAmount?: number /** Gross amount. */;
  commission?: number /** Commission. */;
  netAmount?: number /** Net amount. */;
  type: string /** Activity type. */;
}

/** Zod schema for AccountActivity. */
export const AccountActivitySchema = z.object({
  tradeDate: z.string().datetime().optional(),
  transactionDate: z.string().datetime().optional(),
  settlementDate: z.string().datetime().optional(),
  action: z.string().min(1),
  symbol: z.string().optional(),
  symbolId: z.number().int().positive().optional(),
  description: z.string().optional(),
  currency: z.union([z.enum(CURRENCY_CODES), z.string()]),
  quantity: z.number().optional(),
  price: z.number().optional(),
  grossAmount: z.number().optional(),
  commission: z.number().optional(),
  netAmount: z.number().optional(),
  type: z.string().min(1),
});

//──────────────────────────────────────────────────────────────────────────────
// 3. Response Envelope & Helper
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Response envelope for account activities.
 */
export interface AccountActivitiesResponse {
  /** Array of account activity records. */
  activities: AccountActivity[];
}

/** Zod schema for AccountActivitiesResponse. */
export const AccountActivitiesResponseSchema = z.object({
  activities: z.array(AccountActivitySchema),
});

/**
 * @public
 * Parses and validates raw JSON into `AccountActivitiesResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated activities response object.
 * @throws ZodError if validation fails.
 */
export const parseAccountActivitiesResponse =
  AccountActivitiesResponseSchema.parse;
