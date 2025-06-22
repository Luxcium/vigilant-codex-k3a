import { describe, expect, it } from 'vitest'
import { ExecutionSchema } from '../types/accounts'

const now = new Date().toISOString()

describe('ExecutionSchema', () => {
  it('accepts a valid Execution', () => {
    const input = {
      symbol: 'AAPL',
      symbolId: 1,
      quantity: 1,
      side: 'Buy',
      price: 100,
      id: 123,
      orderId: 456,
      orderChainId: 789,
      exchangeExecId: 'ex',
      timestamp: now,
      notes: 'note',
      venue: 'NYSE',
      totalCost: 100,
      orderPlacementCommission: 1,
      commission: 1,
      executionFee: 1,
      secFee: 1,
      canadianExecutionFee: 1,
      parentId: 0
    }
    const result = ExecutionSchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('rejects missing fields', () => {
    const { success, error } = ExecutionSchema.safeParse({ symbol: 'AAPL' })
    expect(success).toBe(false)
    expect(error?.issues.some((i: any) => i.path.includes('symbolId'))).toBe(true)
  })
})
