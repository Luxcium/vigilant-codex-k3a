import { AccountActivitiesResponseSchema } from './AccountActivitiesResponseSchema';

/**
 * @public
 * Parses and validates raw JSON into `AccountActivitiesResponse`.
 *
 * @param json - Raw API response payload.
 * @returns Validated activities response object.
 * @throws ZodError if validation fails.
 */

export const parseAccountActivitiesResponse =
  AccountActivitiesResponseSchema.parse;
