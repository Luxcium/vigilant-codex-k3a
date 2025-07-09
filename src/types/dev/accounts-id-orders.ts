// src/types/dev/accounts-id-orders.ts

/**
 * @packageDocumentation
 *
 * Development copy: Types & Schemas for **GET /v1/accounts/:id/orders[/:orderId]**
 *
 * @remarks
 * Provides TypeScript request/response typings and Zod schemas for listing and
 * retrieving details of orders in a specified brokerage account over a time
 * range, with optional filtering by state or single order retrieval.
 */

import { z } from 'zod';
import { ORDER_STATE_FILTER_TYPES } from './enums';
import type { OrderStateFilterType } from './enums';

//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shapes – Request Parameters
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Parameters for listing or retrieving orders in an account.
 */
export interface AccountOrdersRequest {
  /**
   * Eight-digit account number (path parameter).
   */
  id: string;

  /**
   * ISO-8601 start of time range (inclusive). Defaults to start of day.
   */
  startTime?: string;

  /**
   * ISO-8601 end of time range (inclusive). Defaults to end of day.
   */
  endTime?: string;

  /**
   * Filter to include all, only open, or only closed orders.
   */
  stateFilter?: OrderStateFilterType;

  /**
   * Specific order ID to retrieve details for a single order.
   */
  orderId?: number;
}

/**
 * @public
 * Zod schema validating AccountOrdersRequest parameters.
 */
export const AccountOrdersRequestSchema = z.object({
  id: z.string().regex(/^\d{8}$/),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  stateFilter: z.enum(ORDER_STATE_FILTER_TYPES).optional(),
  orderId: z.number().int().positive().optional(),
});

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – Order Record and Legs
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * One leg/component of a multi-leg strategy order.
 */
export interface OrderLeg {
  /** Strategy type for multi-leg order (e.g., "Custom"). */
  strategyType: string;

  /** Trigger price for stop-leg orders. */
  triggerStopPrice?: number;

  /** Internal group identifier for this order chain. */
  orderGroupId?: number;

  /** Bracket order class (e.g., "Primary"). */
  orderClass?: string;
}

/**
 * @public
 * Zod schema for validating an OrderLeg.
 */
const OrderLegSchema = z.object({
  strategyType: z.string().min(1),
  triggerStopPrice: z.number().optional(),
  orderGroupId: z.number().int().positive().optional(),
  orderClass: z.string().min(1).optional(),
});

/**
 * @public
 * Details of a single order in an account.
 */
export interface Order {
  /** Internal order identifier. */
  id: number;
  symbol: string;
  symbolId: number;
  totalQuantity: number;
  openQuantity: number;
  filledQuantity: number;
  canceledQuantity: number;
  side: string;
  /** Order price type (e.g., “Market”). Alias: `type`. */
  orderType?: string;
  /** Raw field name in API sometimes returned as `type`. */
  type?: string;
  limitPrice?: number | null;
  stopPrice?: number | null;
  isAllOrNone: boolean;
  isAnonymous: boolean;
  /** Iceberg quantity (alias `icebergQty`). */
  icebergQuantity?: number | null;
  icebergQty?: number | null;
  minQuantity?: number | null;
  avgExecPrice?: number | null;
  lastExecPrice?: number | null;
  source: string;
  timeInForce: string;
  gtdDate?: string | null;
  state: OrderStateFilterType | string;
  clientReasonStr?: string;
  chainId?: number;
  creationTime: string;
  updateTime: string;
  notes?: string;
  primaryRoute?: string;
  secondaryRoute?: string;
  orderRoute?: string;
  venueHoldingOrder?: string;
  commissionCharged?: number;
  /** API typo alias: `comissionCharged`. */
  comissionCharged?: number;
  exchangeOrderId?: string;
  isSignificantShareholder?: boolean;
  /** API typo alias: `isSignificantShareHolder`. */
  isSignificantShareHolder?: boolean;
  isInsider?: boolean;
  isLimitOffsetInDollar?: boolean;
  userId?: number;
  placementCommission?: number | null;
  legs?: OrderLeg[];
  /** Root‑level strategy fields (present in some payloads). */
  strategyType?: string;
  triggerStopPrice?: number | null;
  orderGroupId?: number;
  orderClass?: string | null;
  /** Present in some payloads. */
  mainChainId?: number;
}

/**
 * @public
 * Zod schema validating an Order record.
 */
export const OrderSchema = z.object({
  id: z.number().int().positive(),
  symbol: z.string().min(1),
  symbolId: z.number().int().positive(),
  totalQuantity: z.number().int(),
  openQuantity: z.number().int(),
  filledQuantity: z.number().int(),
  canceledQuantity: z.number().int(),
  side: z.string().min(1),
  orderType: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  limitPrice: z.number().nullable().optional(),
  stopPrice: z.number().nullable().optional(),
  isAllOrNone: z.boolean(),
  isAnonymous: z.boolean(),
  icebergQuantity: z.number().nullable().optional(),
  icebergQty: z.number().nullable().optional(),
  minQuantity: z.number().nullable().optional(),
  avgExecPrice: z.number().nullable().optional(),
  lastExecPrice: z.number().nullable().optional(),
  source: z.string().min(1),
  timeInForce: z.string().min(1),
  gtdDate: z.string().datetime().nullable().optional(),
  state: z.union([z.enum(ORDER_STATE_FILTER_TYPES), z.string()]),
  clientReasonStr: z.string().optional(),
  chainId: z.number().int().positive().optional(),
  creationTime: z.string().datetime(),
  updateTime: z.string().datetime(),
  notes: z.string().optional(),
  primaryRoute: z.string().optional(),
  secondaryRoute: z.string().optional(),
  orderRoute: z.string().optional(),
  venueHoldingOrder: z.string().optional(),
  commissionCharged: z.number().optional(),
  comissionCharged: z.number().optional(),
  exchangeOrderId: z.string().optional(),
  isSignificantShareholder: z.boolean().optional(),
  isSignificantShareHolder: z.boolean().optional(),
  isInsider: z.boolean().optional(),
  isLimitOffsetInDollar: z.boolean().optional(),
  userId: z.number().int().positive().optional(),
  placementCommission: z.number().nullable().optional(),
  legs: z.array(OrderLegSchema).optional(),
  strategyType: z.string().optional(),
  triggerStopPrice: z.number().nullable().optional(),
  orderGroupId: z.number().optional(),
  orderClass: z.string().nullable().optional(),
  mainChainId: z.number().optional(),
});

//──────────────────────────────────────────────────────────────────────────────
// 3. Response Envelope & Helper
//──────────────────────────────────────────────────────────────────────────────

/**
 * @public
 * Response envelope for GET /v1/accounts/:id/orders.
 */
export interface AccountOrdersResponse {
  /** Array of orders in the account. */
  orders: Order[];
}

/**
 * @public
 * Zod schema for validating the AccountOrdersResponse envelope.
 */
export const AccountOrdersResponseSchema = z.object({
  orders: z.array(OrderSchema),
});

/**
 * @public
 * Parses and validates raw JSON into `AccountOrdersResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated orders response object.
 * @throws ZodError if validation fails.
 */
export const parseAccountOrdersResponse = AccountOrdersResponseSchema.parse;
