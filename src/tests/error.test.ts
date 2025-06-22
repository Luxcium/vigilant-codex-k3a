import { describe, expect, it } from 'vitest'
import { handleQuestradeError } from '../errors'

describe('error handling', () => {
  it('order error', async () => {
    const res = {
      ok: false,
      headers: new Headers(),
      json: async () => ({ code: 'E', message: 'm', orderId: 1 })
    } as unknown as Response
    await expect(handleQuestradeError(res)).rejects.toHaveProperty('payload.orderId', 1)
  })
})
