import { RestClient } from '../http/restClient';
import {
  CandleInterval,
  CandlesResponse,
  CandlesResponseSchema
} from '../types';

export interface CandlesParams {
  symbolId: number;
  startTime: string;
  endTime: string;
  interval: CandleInterval;
}

/**
 * Fetch OHLC candles for a symbol over a time range.
 * Validates the response against {@link CandlesResponseSchema}.
 */
export async function fetchCandles(
  client: RestClient,
  params: CandlesParams
): Promise<CandlesResponse> {
  const { symbolId, startTime, endTime, interval } = params;
  const query =
    `?startTime=${encodeURIComponent(startTime)}` +
    `&endTime=${encodeURIComponent(endTime)}` +
    `&interval=${encodeURIComponent(interval)}`;
  const data = await client.get<CandlesResponse>(
    `/markets/candles/${symbolId}${query}`
  );
  return CandlesResponseSchema.parse(data);
}
