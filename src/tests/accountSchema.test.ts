import { describe, expect, it } from 'vitest'
import { AccountSchema } from '../types/accounts'

describe('AccountSchema', () => {
  it('accepts a valid Account', () => {
    const input = {
      number: 'ABC12345',
      type: 'Cash',
      status: 'Active',
      isPrimary: true,
      isBilling: false,
      clientAccountType: 'Individual'
    }
    const result = AccountSchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('rejects missing fields', () => {
    const { success, error } = AccountSchema.safeParse({ number: 'ABC12345' })
    expect(success).toBe(false)
    expect(error?.issues.some((i: any) => i.path.includes('type'))).toBe(true)
  })
})
