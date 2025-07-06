// src/types/dev/symbols-id-options.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/symbols/:id/options**
 * (src/types/dev/symbols-id-options.ts)
 *
 * @remarks
 * This module provides TypeScript types and Zod schemas for the Option Chain
 * endpoint, including detailed TSDoc on every member for IntelliSense and
 * runtime validation.
 */

import { z } from 'zod';
import type {
    ListingExchange,
    OptionExerciseType,
} from './enums';
import {
    LISTING_EXCHANGES,
    OPTION_EXERCISE_TYPES,
} from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – Request Parameter
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Parameters for retrieving an option chain for an underlying symbol.
 */
export interface SymbolOptionsRequest {
  /**
   * @remarks
   * Internal identifier of the underlying symbol (positive integer).
   */
  id: number;
}

/**
 * @public
 * Zod schema for validating SymbolOptionsRequest.
 */
export const SymbolOptionsRequestSchema = z.object({
  id: z.number().int().positive(),
});

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Option Chain Structures
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Represents a call/put option at a specific strike price.
 */
export interface ChainPerStrikePrice {
  /** @remarks Option strike price. */
  strikePrice: number;

  /** @remarks Identifier of the call option symbol. */
  callSymbolId: number;

  /** @remarks Identifier of the put option symbol. */
  putSymbolId: number;
}

/**
 * @public
 * Zod schema for ChainPerStrikePrice.
 */
const ChainPerStrikePriceSchema = z.object({
  strikePrice:    z.number(),
  callSymbolId:   z.number().int().positive(),
  putSymbolId:    z.number().int().positive(),
});

/**
 * @public
 * Represents all strike entries under a given option root.
 */
export interface ChainPerRoot {
  /** @remarks Option root symbol (e.g., "MSFT"). */
  optionRoot: string;

  /** @remarks List of strikes with call/put symbol IDs. */
  chainPerStrikePrice: ChainPerStrikePrice[];
}

/**
 * @public
 * Zod schema for ChainPerRoot.
 */
const ChainPerRootSchema = z.object({
  optionRoot:           z.string().min(1),
  chainPerStrikePrice:  z.array(ChainPerStrikePriceSchema),
});

/**
 * @public
 * Represents option chain details grouped by expiry date.
 */
export interface ChainPerExpiryDate {
  /** @remarks Option expiry date in ISO-8601 format. */
  expiryDate: string;

  /** @remarks Description of the underlying option. */
  description: string;

  /** @remarks Primary listing exchange code. */
  listingExchange: ListingExchange;

  /** @remarks Style of exercise (American/European). */
  optionExerciseType: OptionExerciseType;

  /** @remarks Option roots with associated strike chains. */
  chainPerRoot: ChainPerRoot[];
}

/**
 * @public
 * Zod schema for ChainPerExpiryDate.
 */
const ChainPerExpiryDateSchema = z.object({
  expiryDate:         z.string().datetime(),
  description:        z.string().min(1),
  listingExchange:    z.enum(LISTING_EXCHANGES),
  optionExerciseType: z.enum(OPTION_EXERCISE_TYPES),
  chainPerRoot:       z.array(ChainPerRootSchema),
});

/**
 * @public
 * Response envelope for GET /v1/symbols/:id/options.
 */
export interface SymbolOptionsResponse {
  /** @remarks Array of option chains grouped by expiry. */
  symbols: ChainPerExpiryDate[];
}

/**
 * @public
 * Zod schema for SymbolOptionsResponse.
 */
export const SymbolOptionsResponseSchema = z.object({
  symbols: z.array(ChainPerExpiryDateSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `SymbolOptionsResponse`.
 *
 * @param json - Raw response payload.
 * @returns Validated option chain response.
 * @throws ZodError if the payload is invalid.
 */
export const parseSymbolOptionsResponse = SymbolOptionsResponseSchema.parse;
