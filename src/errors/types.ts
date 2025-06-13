export interface GeneralError {
  code: number
  message: string
}

export interface OrderError extends GeneralError {
  orderId: number
  orders?: unknown
}

export type QuestradeErrorResponse = GeneralError | OrderError

export class QuestradeError extends Error {
  constructor(public payload: QuestradeErrorResponse) {
    super(payload.message)
    this.name = 'QuestradeError'
  }
}
