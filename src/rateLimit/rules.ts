/** Quotas per category. */
export const RULES = {
  account: { rps: 30, rph: 30_000 },
  market: { rps: 20, rph: 15_000 },
} as const;

/** Rate limit category names. */
export type Category = keyof typeof RULES;

/** Determine which bucket a URL belongs to. */
export const categorize = (url: string): Category =>
  /markets\/quotes|markets\/candles|symbols/.test(url) ? 'market' : 'account';
