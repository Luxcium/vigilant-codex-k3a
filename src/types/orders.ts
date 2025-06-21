import { z } from 'zod';
import {
  OrderSide,
  OrderType,
  TimeInForce,
  OrderState,
  OrderAction,
  StrategyType,
  OrderClass,
  OrderSideSchema,
  OrderTypeSchema,
  TimeInForceSchema,
  OrderStateSchema,
  OrderActionSchema,
  StrategyTypeSchema,
  OrderClassSchema
} from './enums';

/** A single leg of a multi-leg order */
export interface OrderLeg {
  strategyType: StrategyType;
  triggerStopPrice: number | null;
  orderGroupId: number;
  orderClass: OrderClass;
}

/** Zod schema for {@link OrderLeg} */
export const OrderLegSchema = z.object({
  strategyType: StrategyTypeSchema,
  triggerStopPrice: z.number().nullable(),
  orderGroupId: z.number().int(),
  orderClass: OrderClassSchema
});

/** Detailed order information */
export interface Order {
  id: number;
  symbol: string;
  symbolId: number;
  totalQuantity: number;
  openQuantity: number;
  filledQuantity: number;
  canceledQuantity: number;
  side: OrderSide;
  orderType: OrderType;
  limitPrice: number | null;
  stopPrice: number | null;
  isAllOrNone: boolean;
  isAnonymous: boolean;
  icebergQuantity: number | null;
  minQuantity: number | null;
  avgExecPrice: number | null;
  lastExecPrice: number | null;
  source: string;
  timeInForce: TimeInForce;
  gtdDate: string | null;
  state: OrderState;
  clientReasonStr: string;
  chainId: number;
  creationTime: string;
  updateTime: string;
  notes: string;
  primaryRoute: string;
  secondaryRoute: string;
  orderRoute: string;
  venueHoldingOrder: string;
  commissionCharged: number;
  exchangeOrderId: string;
  isSignificantShareholder: boolean;
  isInsider: boolean;
  isLimitOffsetInDollar: boolean;
  userId: number;
  placementCommission: number;
  legs?: OrderLeg[];
}

/** Zod schema for {@link Order} */
export const OrderSchema = z.object({
  id: z.number().int(),
  symbol: z.string(),
  symbolId: z.number().int(),
  totalQuantity: z.number(),
  openQuantity: z.number(),
  filledQuantity: z.number(),
  canceledQuantity: z.number(),
  side: OrderSideSchema,
  orderType: OrderTypeSchema,
  limitPrice: z.number().nullable(),
  stopPrice: z.number().nullable(),
  isAllOrNone: z.boolean(),
  isAnonymous: z.boolean(),
  icebergQuantity: z.number().nullable(),
  minQuantity: z.number().nullable(),
  avgExecPrice: z.number().nullable(),
  lastExecPrice: z.number().nullable(),
  source: z.string(),
  timeInForce: TimeInForceSchema,
  gtdDate: z.string().nullable(),
  state: OrderStateSchema,
  clientReasonStr: z.string(),
  chainId: z.number().int(),
  creationTime: z.string(),
  updateTime: z.string(),
  notes: z.string(),
  primaryRoute: z.string(),
  secondaryRoute: z.string(),
  orderRoute: z.string(),
  venueHoldingOrder: z.string(),
  commissionCharged: z.number(),
  exchangeOrderId: z.string(),
  isSignificantShareholder: z.boolean(),
  isInsider: z.boolean(),
  isLimitOffsetInDollar: z.boolean(),
  userId: z.number().int(),
  placementCommission: z.number(),
  legs: z.array(OrderLegSchema).optional()
});
