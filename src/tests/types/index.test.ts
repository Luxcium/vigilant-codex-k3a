import { describe, expect, it } from 'vitest';
import * as types from '../../../src/types/index.js';

describe('Types index exports', () => {
  it('should export modules without error', () => {
    expect(typeof types).toBe('object');
  });
});
