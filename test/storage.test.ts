import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { save, load, clear, OAuthTokens } from '../src/auth/storage'
import { promises as fs } from 'fs'

const file = '.keys/test.json'
const tokens:OAuthTokens = { accessToken: 'a', apiServer: 's', refreshToken: 'r', expiresAt: 0 }

describe('storage', () => {
  afterEach(async () => { await clear(file) })

  it('save and load tokens', async () => {
    await save(file, tokens)
    const loaded = await load(file)
    expect(loaded).toEqual(tokens)
  })

  it('returns null when file missing', async () => {
    const loaded = await load('missing.json')
    expect(loaded).toBeNull()
  })
})
