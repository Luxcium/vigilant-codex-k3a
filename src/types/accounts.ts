import { z } from 'zod'
import {
  AccountTypeSchema,
  AccountStatusSchema,
  ClientAccountTypeSchema,
  CurrencySchema,
  OrderActionSchema
} from './enums'

/** Basic account information. */
export interface Account {
  number: string
  type: z.infer<typeof AccountTypeSchema>
  status: z.infer<typeof AccountStatusSchema>
  isPrimary: boolean
  isBilling: boolean
  clientAccountType: z.infer<typeof ClientAccountTypeSchema>
}

export const AccountSchema = z.object({
  number: z.string(),
  type: AccountTypeSchema,
  status: AccountStatusSchema,
  isPrimary: z.boolean(),
  isBilling: z.boolean(),
  clientAccountType: ClientAccountTypeSchema
})

/** Per-currency balance info. */
export interface Balance {
  currency: z.infer<typeof CurrencySchema>
  cash: number
  marketValue: number
  totalEquity: number
  buyingPower: number
  maintenanceExcess: number
  isRealTime: boolean
}

export const BalanceSchema = z.object({
  currency: CurrencySchema,
  cash: z.number(),
  marketValue: z.number(),
  totalEquity: z.number(),
  buyingPower: z.number(),
  maintenanceExcess: z.number(),
  isRealTime: z.boolean()
})

/** A position held in an account. */
export interface Position {
  symbol: string
  symbolId: number
  openQuantity: number
  closedQuantity: number
  currentMarketValue: number
  currentPrice: number
  averageEntryPrice: number
  closedPnl: number
  openPnl: number
  totalCost: number
  isRealTime: boolean
  isUnderReorg: boolean
}

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
})

/** An execution fill. */
export interface Execution {
  symbol: string
  symbolId: number
  quantity: number
  side: z.infer<typeof OrderActionSchema>
  price: number
  id: number
  orderId: number
  orderChainId: number
  exchangeExecId: string
  timestamp: string
  notes: string
  venue: string
  totalCost: number
  orderPlacementCommission: number
  commission: number
  executionFee: number
  secFee: number
  canadianExecutionFee: number
  parentId: number
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
})

/** Account activity entry. */
export interface AccountActivity {
  tradeDate: string
  transactionDate: string
  settlementDate: string
  action: string
  symbol: string
  symbolId: number
  description: string
  currency: z.infer<typeof CurrencySchema>
  quantity: number
  price: number
  grossAmount: number
  commission: number
  netAmount: number
  type: string
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
})

/** Response shapes */
export interface AccountsResponse {
  accounts: Account[]
  userId: number
}
export const AccountsResponseSchema = z.object({
  accounts: z.array(AccountSchema),
  userId: z.number().int()
})

export interface AccountBalancesResponse {
  perCurrencyBalances: Balance[]
  combinedBalances: Balance[]
  sodPerCurrencyBalances: Balance[]
  sodCombinedBalances: Balance[]
}
export const AccountBalancesResponseSchema = z.object({
  perCurrencyBalances: z.array(BalanceSchema),
  combinedBalances: z.array(BalanceSchema),
  sodPerCurrencyBalances: z.array(BalanceSchema),
  sodCombinedBalances: z.array(BalanceSchema)
})

export interface PositionsResponse {
  positions: Position[]
}
export const PositionsResponseSchema = z.object({
  positions: z.array(PositionSchema)
})

export interface ExecutionsResponse {
  executions: Execution[]
}
export const ExecutionsResponseSchema = z.object({
  executions: z.array(ExecutionSchema)
})

export interface ActivitiesResponse {
  activities: AccountActivity[]
}
export const ActivitiesResponseSchema = z.object({
  activities: z.array(AccountActivitySchema)
})
