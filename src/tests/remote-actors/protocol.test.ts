import { describe, expect, it } from 'vitest';
import { encodeRequest, decodeRequest, encodeResponse, decodeResponse } from '../../remote-actors';

describe('protocol', () => {
  it('round trips request', () => {
    const req = { id: 1, method: 'echo', params: 'hi' };
    const json = encodeRequest(req);
    const parsed = decodeRequest(json);
    expect(parsed).toEqual(req);
  });

  it('round trips response', () => {
    const res = { id: 1, result: 'ok' };
    const json = encodeResponse(res);
    const parsed = decodeResponse(json);
    expect(parsed).toEqual(res);
  });
});
