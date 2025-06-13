import { mapError } from './map';
import { OrderError, QuestradeError, QuestradeErrorPayload } from './types';

export const handleQuestradeError = async <T>(res: Response): Promise<T> => {
  const data = (await res.json()) as QuestradeErrorPayload;
  const payload = mapError(data);
  if (payload.orderId) throw new OrderError(payload);
  throw new QuestradeError(payload);
};
