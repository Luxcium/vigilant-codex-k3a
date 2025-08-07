import { describe, expect, it } from 'vitest';
import * as types from '../../core/types/index';

describe('Types index exports', () => {
  it('should export modules without error', () => {
    expect(typeof types).toBe('object');
  });
});
