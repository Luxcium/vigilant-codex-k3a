export interface RpcRequest {
  id: string;
  method: string;
  params: unknown[];
}

export interface RpcResult {
  id: string;
  result: unknown;
}

export interface RpcError {
  id: string;
  error: { code: number; message: string; data?: unknown };
}

export type RpcResponse = RpcResult | RpcError;

export const encodeRequest = (req: RpcRequest): string =>
  JSON.stringify(req);

export const decodeRequest = (payload: string): RpcRequest =>
  JSON.parse(payload) as RpcRequest;

export const encodeResponse = (res: RpcResponse): string =>
  JSON.stringify(res);

export const decodeResponse = (payload: string): RpcResponse =>
  JSON.parse(payload) as RpcResponse;
