import { z } from 'zod';
import {
  AccountTypeSchema,
  AccountStatusSchema,
  ClientAccountTypeSchema,
  CurrencySchema,
  AccountType,
  AccountStatus,
  ClientAccountType,
  Currency
} from './enums';

/** Basic account information */
export interface Account {
  number: string;
  type: AccountType;
  status: AccountStatus;
  isPrimary: boolean;
  isBilling: boolean;
  clientAccountType: ClientAccountType;
}

/** Zod schema for {@link Account} */
export const AccountSchema = z.object({
  number: z.string(),
  type: AccountTypeSchema,
  status: AccountStatusSchema,
  isPrimary: z.boolean(),
  isBilling: z.boolean(),
  clientAccountType: ClientAccountTypeSchema
});

/** Per-currency balance information */
export interface Balance {
  currency: Currency;
  cash: number;
  marketValue: number;
  totalEquity: number;
  buyingPower: number;
  maintenanceExcess: number;
  isRealTime: boolean;
}

/** Zod schema for {@link Balance} */
export const BalanceSchema = z.object({
  currency: CurrencySchema,
  cash: z.number(),
  marketValue: z.number(),
  totalEquity: z.number(),
  buyingPower: z.number(),
  maintenanceExcess: z.number(),
  isRealTime: z.boolean()
});

/** Position in an account */
export interface Position {
  symbol: string;
  symbolId: number;
  openQuantity: number;
  closedQuantity: number;
  currentMarketValue: number;
  currentPrice: number;
  averageEntryPrice: number;
  closedPnl: number;
  openPnl: number;
  totalCost: number;
  isRealTime: boolean;
  isUnderReorg: boolean;
}

/** Zod schema for {@link Position} */
export const PositionSchema = z.object({
  symbol: z.string(),
  symbolId: z.number().int(),
  openQuantity: z.number(),
  closedQuantity: z.number(),
  currentMarketValue: z.number(),
  currentPrice: z.number(),
  averageEntryPrice: z.number(),
  closedPnl: z.number(),
  openPnl: z.number(),
  totalCost: z.number(),
  isRealTime: z.boolean(),
  isUnderReorg: z.boolean()
});


/** Execution fill within an account */
export interface Execution {
  symbol: string;
  symbolId: number;
  quantity: number;
  side: OrderAction;
  price: number;
  id: number;
  orderId: number;
  orderChainId: number;
  exchangeExecId: string;
  timestamp: string;
  notes: string;
  venue: string;
  totalCost: number;
  orderPlacementCommission: number;
  commission: number;
  executionFee: number;
  secFee: number;
  canadianExecutionFee: number;
  parentId: number;
}

export const ExecutionSchema = z.object({
  symbol: z.string(),
  symbolId: z.number().int(),
  quantity: z.number().int(),
  side: OrderActionSchema,
  price: z.number(),
  id: z.number().int(),
  orderId: z.number().int(),
  orderChainId: z.number().int(),
  exchangeExecId: z.string(),
  timestamp: z.string(),
  notes: z.string(),
  venue: z.string(),
  totalCost: z.number(),
  orderPlacementCommission: z.number(),
  commission: z.number(),
  executionFee: z.number(),
  secFee: z.number(),
  canadianExecutionFee: z.number().int(),
  parentId: z.number().int()
});

/** Entry in account activity log */
export interface AccountActivity {
  tradeDate: string;
  transactionDate: string;
  settlementDate: string;
  action: string;
  symbol: string;
  symbolId: number;
  description: string;
  currency: Currency;
  quantity: number;
  price: number;
  grossAmount: number;
  commission: number;
  netAmount: number;
  type: string;
}

export const AccountActivitySchema = z.object({
  tradeDate: z.string(),
  transactionDate: z.string(),
  settlementDate: z.string(),
  action: z.string(),
  symbol: z.string(),
  symbolId: z.number().int(),
  description: z.string(),
  currency: CurrencySchema,
  quantity: z.number(),
  price: z.number(),
  grossAmount: z.number(),
  commission: z.number(),
  netAmount: z.number(),
  type: z.string()
});
