// src/types/dev/accounts.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/accounts**
 *
 * @remarks
 * Provides TypeScript types and Zod schemas for retrieving brokerage accounts
 * accessible to the authenticated user. The schema is tolerant of minor API
 * variations: unknown enum values fall back to `string`, and `userId` is
 * optional because it is sometimes omitted in Questrade responses.
 */

/**
 * Handles account-related operations and data structures.
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
export interface GetAccountsRequest {}

/**
 * @public
 * Zod schema validating an empty request object for Accounts.
 */
export const GetAccountsRequestSchema = z.object({}).strict();

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Account Records
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Details of a brokerage account accessible by the user.
 */
export interface Account {
  /** Type of the account (e.g., "Cash", "Margin"). */
  type: AccountType;
  /** Eight‑digit account number (string of digits). */
  number: string;
  /** Operational status of the account (e.g., "Active"). */
  status: AccountStatus;
  /** Whether this is the primary account for the holder. */
  isPrimary: boolean;
  /** Whether this account is billed for fees and market data. */
  isBilling: boolean;
  /** Type of client holding the account (e.g., "Individual"). */
  clientAccountType: ClientAccountType;
  /** Internal identifier of the user owning the account (may be omitted). */
  userId?: number;
}

/**
 * @public
 * Zod schema for validating an Account record.
 */
export const AccountSchema = z.object({
  type: z.union([z.enum(ACCOUNT_TYPES), z.string()]),
  number: z.string().regex(/^\d{8}$/),
  status: z.union([z.enum(ACCOUNT_STATUSES), z.string()]),
  isPrimary: z.boolean(),
  isBilling: z.boolean(),
  clientAccountType: z.union([z.enum(CLIENT_ACCOUNT_TYPES), z.string()]),
  userId: z.number().int().positive().optional(),
});

//──────────────────────────────────────────────────────────────────────────────
// 3. Response Envelope & Helper
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Response envelope for GET /v1/accounts.
 */
export interface GetAccountsResponse {
  /** Array of account records for the authenticated user. */
  accounts: Account[];
}

/**
 * @public
 * Zod schema for validating the AccountsResponse envelope.
 */
export const GetAccountsResponseSchema = z.object({
  accounts: z.array(AccountSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `AccountsResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated accounts response object.
 * @throws ZodError if validation fails.
 */
export const parseGetAccountsResponse = GetAccountsResponseSchema.parse;
