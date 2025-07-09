import { z } from 'zod';
import { CURRENCY_CODES } from '../enums';

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
