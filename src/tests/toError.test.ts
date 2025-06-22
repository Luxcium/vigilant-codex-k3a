import { describe, expect, it } from 'vitest'
import { toQuestradeError } from '../errors/toError'
import { QuestradeError } from '../errors/types'

const makeRes = (status: number, body: object) => {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

describe('toError', () => {
  it('maps known code', async () => {
    const res = makeRes(401, { code: 1017, message: 'bad' })
    const err = await toQuestradeError(res)
    expect(err).toBeInstanceOf(QuestradeError)
    expect(err.message).toBe('Invalid authentication tokens')
  })

  it('uses response message when unknown', async () => {
    const res = makeRes(500, { code: 9999, message: 'oops' })
    const err = await toQuestradeError(res)
    expect(err.message).toBe('oops')
  })
})
