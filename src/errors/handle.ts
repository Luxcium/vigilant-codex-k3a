import { toQuestradeError } from './toError'
import { OrderError, QuestradeErrorPayload } from './types'

export const handleQuestradeError = async <T>(res: Response): Promise<T> => {
  const err = await toQuestradeError(res)
  const payload = err.payload as QuestradeErrorPayload
  if ('orderId' in payload) throw new OrderError(payload)
  throw err
}
