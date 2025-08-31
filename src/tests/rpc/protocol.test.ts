import { describe, expect, test } from 'vitest';
import {
  encodeRequest,
  decodeRequest,
  encodeResponse,
  decodeResponse,
  RpcRequest,
  RpcResponse,
} from '../../rpc/protocol';

describe('protocol', () => {
  test('request round trip', () => {
    const req: RpcRequest = { id: '1', method: 'echo', params: ['hi'] };
    const encoded = encodeRequest(req);
    const decoded = decodeRequest(encoded);
    expect(decoded).toEqual(req);
  });

  test('response round trip', () => {
    const res: RpcResponse = { id: '1', result: 'ok' };
    const encoded = encodeResponse(res);
    const decoded = decodeResponse(encoded);
    expect(decoded).toEqual(res);
  });
});
