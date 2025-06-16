import { QuestradeError, QuestradeErrorPayload } from './types'
import { CODE_MAP } from './codes'

/**
 * Convert an HTTP response to a structured `QuestradeError`.
 */
export const toQuestradeError = async (res: Response): Promise<QuestradeError> => {
  const data = (await res.json()) as QuestradeErrorPayload
  const key = `${res.status}:${data.code}`
  const msg = CODE_MAP[key] ?? data.message
  return new QuestradeError({ ...data, message: msg })
}
