import type { CurrencyCode } from '../enums';

//──────────────────────────────────────────────────────────────────────────────
// 2. Response Shapes – AccountActivity Record
//──────────────────────────────────────────────────────────────────────────────
/**
 * @public
 * An individual account activity entry.
 */

export interface AccountActivity {
  /** Trade date. */
  tradeDate?: string;
  /** Transaction date. */
  transactionDate?: string;
  /** Settlement date. */
  settlementDate?: string;
  /** Activity action. */
  action: string;
  /** Symbol name. */
  symbol?: string;
  /** Symbol identifier. */
  symbolId?: number;
  /** Description. */
  description?: string;
  /** Currency code. */
  currency: CurrencyCode | string;
  /** Quantity. */
  quantity?: number;
  /** Price. */
  price?: number;
  /** Gross amount. */
  grossAmount?: number;
  /** Commission. */
  commission?: number;
  /** Net amount. */
  netAmount?: number;
  /** Activity type. */
  type: string;
}
