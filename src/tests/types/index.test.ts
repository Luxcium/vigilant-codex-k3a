import { describe, it, expect } from 'vitest'
import * as types from '../../../src/types'

describe('Types index exports', () => {
  it('should export modules without error', () => {
    expect(typeof types).toBe('object')
  })
})