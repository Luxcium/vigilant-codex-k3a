export interface GeneralErrorPayload {
  code: number;
  message: string;
}

export interface OrderErrorPayload extends GeneralErrorPayload {
  orderId: number;
  orders?: unknown;
}

export type QuestradeErrorPayload = GeneralErrorPayload | OrderErrorPayload;

export class QuestradeError extends Error {
  constructor(public payload: QuestradeErrorPayload) {
    super(payload.message);
    this.name = 'QuestradeError';
  }
}

export class OrderError extends QuestradeError {
  constructor(public override payload: OrderErrorPayload) {
    super(payload);
    this.name = 'OrderError';
  }
}
