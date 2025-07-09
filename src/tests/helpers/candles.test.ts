import { describe, expect, it, vi } from 'vitest';
import { fetchCandles } from '../../../src/helpers/candles';
import { CandleInterval } from '../../../src/types';
import type { RestClient } from '../../../src/http/restClient';

const params = {
  symbolId: 1,
  startTime: '2025-01-01',
  endTime: '2025-01-02',
  interval: 'OneDay' as CandleInterval,
};

describe('fetchCandles', () => {
  it('returns validated candles', async () => {
    const expected = {
      candles: [
        {
          start: '2025-01-01',
          end: '2025-01-02',
          open: 1,
          high: 2,
          low: 0,
          close: 1.5,
          volume: 10,
        },
      ],
    };
    const client = {
      get: vi.fn(async () => expected),
    } as unknown as RestClient;
    const res = await fetchCandles(client, params);
    expect(res).toEqual(expected);
    expect(client.get).toHaveBeenCalledWith(
      '/markets/candles/1?startTime=2025-01-01&endTime=2025-01-02&interval=OneDay'
    );
  });

  it('throws on invalid shape', async () => {
    const client = {
      get: vi.fn(async () => ({ foo: 'bar' })),
    } as unknown as RestClient;
    await expect(fetchCandles(client, params)).rejects.toThrow();
  });
});
