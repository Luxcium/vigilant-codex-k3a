// src/types/dev/time.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/time**
 *
 * @remarks
 * Provides TypeScript types and Zod validation for the server time endpoint,
 * which returns the current time in ISO-8601 format (Eastern Time Zone).
 */

import { z } from 'zod';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – No Parameters
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * No parameters are required or allowed for the Time endpoint.
 */
export type TimeRequest = Record<string, never>;

/**
 * @public
 * Zod schema validating an empty request object for Time.
 *
 * @remarks
 * Ensures no extraneous data is sent in the request.
 */
export const TimeRequestSchema = z.object({}).strict();

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shape – Server Time
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Response containing the server's current time.
 */
export interface TimeResponse {
  /** @remarks
   * Current server time in ISO-8601 format, Eastern Time Zone.
   */
  time: string;
}

/**
 * @public
 * Zod schema for validating a TimeResponse.
 */
export const TimeResponseSchema = z.object({
  time: z.string().datetime(),
});

/**
 * @public
 * Parses and validates raw JSON into `TimeResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated time response object.
 * @throws ZodError if validation fails.
 *
 * @example
 * ```ts
 * const data = await fetchJson('/v1/time');
 * const resp = parseTimeResponse(data);
 * console.log(resp.time); // e.g. "2025-07-08T02:15:00.000000-04:00"
 * ```
 */
export const parseTimeResponse = TimeResponseSchema.parse;
