import { Response as FetchResponse } from 'node-fetch';
import { CODE_MAP } from './codes';
import { QuestradeError, QuestradeErrorPayload } from './types';

/**
 * Convert an HTTP response to a structured `QuestradeError`.
 */
export const toQuestradeError = async (
  res: FetchResponse
): Promise<QuestradeError> => {
  const data = (await res.json()) as QuestradeErrorPayload;
  const key = `${res.status}:${data.code}`;
  const msg = CODE_MAP[key] ?? data.message;
  return new QuestradeError({ ...data, message: msg });
};
