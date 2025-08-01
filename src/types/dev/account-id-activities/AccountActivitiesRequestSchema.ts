import { z } from 'zod';

/**
 * @public
 * Zod schema validating AccountActivitiesRequest.
 */

export const AccountActivitiesRequestSchema = z.object({
  id: z.string().regex(/^\d{8}$/),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});
