// src/types/dev/accounts.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/accounts**
 *
 * @remarks
 * Provides TypeScript types and Zod schemas for retrieving user accounts.
 * No request parameters are required; the response lists all accessible accounts.
 */

import { z } from 'zod';
import { ACCOUNT_TYPES, ACCOUNT_STATUSES, CLIENT_ACCOUNT_TYPES } from './enums';
import type { AccountType, AccountStatus, ClientAccountType } from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – No Parameters
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * No parameters are required or allowed for the Accounts endpoint.
 */
export type AccountsRequest = Record<string, never>;

/**
 * @public
 * Zod schema validating an empty request object for Accounts.
 *
 * @remarks
 * Ensures that no extraneous data is sent.
 */
export const AccountsRequestSchema = z.object({}).strict();

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Account Records
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Details of a brokerage account accessible by the user.
 */
export interface Account {
  /** @remarks Type of the account (e.g., "Cash", "Margin"). */
  type: AccountType;

  /** @remarks Eight-digit account number (e.g., "26598145"). */
  number: string;

  /** @remarks Operational status of the account (e.g., "Active"). */
  status: AccountStatus;

  /** @remarks Whether this is the primary account for the holder. */
  isPrimary: boolean;

  /** @remarks Whether this account is billed for fees and market data. */
  isBilling: boolean;

  /** @remarks Type of client holding the account (e.g., "Individual"). */
  clientAccountType: ClientAccountType;

  /** @remarks Internal identifier of the user owning the account. */
  userId: number;
}

/**
 * @public
 * Zod schema for validating an Account record.
 */
export const AccountSchema = z.object({
  type: z.enum(ACCOUNT_TYPES),
  number: z.string().length(8),
  status: z.enum(ACCOUNT_STATUSES),
  isPrimary: z.boolean(),
  isBilling: z.boolean(),
  clientAccountType: z.enum(CLIENT_ACCOUNT_TYPES),
  userId: z.number().int().positive(),
});

//──────────────────────────────────────────────────────────────────────────────
// 3. Response Envelope & Helper
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Response envelope for GET /v1/accounts.
 */
export interface AccountsResponse {
  /** @remarks Array of account records for the authenticated user. */
  accounts: Account[];
}

/**
 * @public
 * Zod schema for validating the AccountsResponse envelope.
 */
export const AccountsResponseSchema = z.object({
  accounts: z.array(AccountSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `AccountsResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated accounts response object.
 * @throws ZodError if validation fails.
 *
 * @example
 * ```ts
 * const data = await fetchJson('/v1/accounts');
 * const resp = parseAccountsResponse(data);
 * console.log(resp.accounts.map(a => a.number));
 * ```
 */
export const parseAccountsResponse = AccountsResponseSchema.parse;
