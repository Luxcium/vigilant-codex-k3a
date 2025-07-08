// src/types/dev/accounts-id-balances.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/accounts/:id/balances**
 *
 * @remarks
 * Provides TypeScript types and Zod schemas for retrieving per-currency,
 * combined, start-of-day per-currency, and start-of-day combined balances
 * for a specific brokerage account.
 */

import { z } from 'zod';
import { CURRENCY_CODES } from './enums';
import type { CurrencyCode } from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – Request Parameters
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Request parameters for account balances.
 */
export interface AccountBalancesRequest {
  /**
   * @remarks Eight-digit account number (path parameter).
   */
  id: string;
}

/**
 * @public
 * Zod schema for validating AccountBalancesRequest.
 */
export const AccountBalancesRequestSchema = z.object({
  id: z.string().regex(/^\d{8}$/),
});

//──────────────────────────────────────────────────────────────────────────────
// 2. Balance Record – Shared Fields
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Represents a balance summary for a currency.
 */
export interface Balance {
  /** @remarks Currency code (ISO-4217, e.g., "USD" or "CAD"). */
  currency: CurrencyCode | string;

  /** @remarks Current cash balance. */
  cash: number;

  /** @remarks Market value of all securities in the account in this currency. */
  marketValue: number;

  /** @remarks Equity = cash + marketValue. */
  totalEquity: number;

  /** @remarks Buying power for this currency side of the account. */
  buyingPower: number;

  /** @remarks Maintenance excess for this currency side of the account. */
  maintenanceExcess: number;

  /** @remarks Whether real-time data was used to calculate values. */
  isRealTime: boolean;
}

/**
 * @public
 * Zod schema for validating a Balance record.
 */
export const BalanceSchema = z.object({
  currency: z.union([z.enum(CURRENCY_CODES), z.string()]),
  cash: z.number(),
  marketValue: z.number(),
  totalEquity: z.number(),
  buyingPower: z.number(),
  maintenanceExcess: z.number(),
  isRealTime: z.boolean(),
});

//──────────────────────────────────────────────────────────────────────────────
// 3. Response Envelope & Helper
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Response envelope for GET /v1/accounts/:id/balances.
 */
export interface AccountBalancesResponse {
  /** @remarks Per-currency balances as of now. */
  perCurrencyBalances: Balance[];

  /** @remarks Combined balances across all currencies. */
  combinedBalances: Balance[];

  /** @remarks Start-of-day per-currency balances. */
  sodPerCurrencyBalances: Balance[];

  /** @remarks Start-of-day combined balances across all currencies. */
  sodCombinedBalances: Balance[];
}

/**
 * @public
 * Zod schema for validating AccountBalancesResponse.
 */
export const AccountBalancesResponseSchema = z.object({
  perCurrencyBalances: z.array(BalanceSchema),
  combinedBalances: z.array(BalanceSchema),
  sodPerCurrencyBalances: z.array(BalanceSchema),
  sodCombinedBalances: z.array(BalanceSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `AccountBalancesResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated balances response object.
 * @throws ZodError if validation fails.
 *
 * @example
 * ```ts
 * const data = await fetchJson('/v1/accounts/26598145/balances');
 * const resp = parseAccountBalancesResponse(data);
 * console.log(resp.perCurrencyBalances[0].cash);
 * ```
 */
export const parseAccountBalancesResponse = AccountBalancesResponseSchema.parse;
