import { describe, expect, it } from 'vitest';
import { handleQuestradeError, QuestradeError } from '../core/errors';

describe('error handling', () => {
  it('order error', async () => {
    const res = new Response(
      JSON.stringify({ code: 'E', message: 'm', orderId: 1 }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    await expect(handleQuestradeError(res)).rejects.toHaveProperty(
      'payload.orderId',
      1
    );
  });
  it('throws generic QuestradeError for non-order payload', async () => {
    const res = new Response(JSON.stringify({ code: 'X', message: 'oops' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
    await expect(handleQuestradeError(res)).rejects.toBeInstanceOf(
      QuestradeError
    );
  });
});
