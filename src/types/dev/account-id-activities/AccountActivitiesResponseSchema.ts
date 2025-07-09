import { z } from 'zod';
import { AccountActivitySchema } from './AccountActivitySchema';

/** Zod schema for AccountActivitiesResponse. */

export const AccountActivitiesResponseSchema = z.object({
  activities: z.array(AccountActivitySchema),
});
