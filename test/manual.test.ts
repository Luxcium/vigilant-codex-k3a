import { describe, it, expect, vi } from 'vitest'
import { bootstrap } from '../src/auth/manual'
import * as storage from '../src/auth/storage'

vi.mock('../src/auth/storage', async () => {
  const mod = await vi.importActual<typeof storage>('../src/auth/storage')
  return {
    ...mod,
    save: vi.fn(mod.save)
  }
})

const globalFetch = global.fetch

describe('bootstrap', () => {
  it('saves tokens to file', async () => {
    global.fetch = vi.fn(async () =>
      new Response(
        JSON.stringify({ access_token: 'a', api_server: 's', expires_in: 1 })
      )
    )
    await bootstrap('test', 'r')
    expect(storage.save).toHaveBeenCalled()
    global.fetch = globalFetch
  })
})
