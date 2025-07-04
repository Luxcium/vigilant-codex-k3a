import { z } from 'zod'
import { OrderSchema } from './orders'
import type { Order } from './orders'

export interface ApiError {
  code: number
  message: string
  orderId?: number
  orders?: Order[]
}

export const ApiErrorSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  orderId: z.number().int().optional(),
  orders: z.array(OrderSchema).optional()
})
