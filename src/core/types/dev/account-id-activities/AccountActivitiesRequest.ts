//──────────────────────────────────────────────────────────────────────────────
// 1. Input Shape – Request Parameters
//──────────────────────────────────────────────────────────────────────────────
/**
 * @public
 * Request parameters for the activities endpoint.
 */

export interface AccountActivitiesRequest {
  /** Eight-digit account number (path parameter). */
  id: string;
  /** ISO-8601 start of time range (inclusive). */
  startTime?: string;
  /** ISO-8601 end of time range (inclusive). */
  endTime?: string;
}
