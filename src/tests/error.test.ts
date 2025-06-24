import { describe, expect, it } from 'vitest'
import { handleQuestradeError, QuestradeError } from '../errors'

describe('error handling', () => {
  it('order error', async () => {
    const res = {
      ok: false,
      headers: new Headers(),
      json: async () => ({ code: 'E', message: 'm', orderId: 1 })
    } as unknown as Response
    await expect(handleQuestradeError(res)).rejects.toHaveProperty('payload.orderId', 1)
  })
  it('throws generic QuestradeError for non-order payload', async () => {
    const res = {
      ok: false,
      headers: new Headers(),
      json: async () => ({ code: 'X', message: 'oops' })
    } as unknown as Response
    await expect(handleQuestradeError(res)).rejects.toBeInstanceOf(QuestradeError)
  })
})
