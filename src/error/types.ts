export interface QuestradeErrorPayload {
  code: string;
  message: string;
  orderId?: number;
}

export class QuestradeError extends Error {
  constructor(public readonly payload: QuestradeErrorPayload) {
    super(payload.message);
  }
}

export class OrderError extends QuestradeError {}
