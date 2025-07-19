import { AccountActivity } from './AccountActivity';

//──────────────────────────────────────────────────────────────────────────────
// 3. Response Envelope & Helper
//──────────────────────────────────────────────────────────────────────────────
/**
 * @public
 * Response envelope for account activities.
 */

export interface AccountActivitiesResponse {
  /** Array of account activity records. */
  activities: AccountActivity[];
}
