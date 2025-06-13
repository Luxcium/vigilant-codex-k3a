import { Category, RULES } from './rules'

/**
 * Create an in-memory token bucket rate limiter.
 */
export const createRateLimiter = () => {
  type Bucket = { tokens: number; last: number }
  const buckets = new Map<Category, Bucket>(
    Object.entries(RULES).map(([k, v]) => [k as Category, { tokens: v.rps, last: Date.now() }])
  )

  const refill = (cat: Category): void => {
    const b = buckets.get(cat)!
    const now = Date.now()
    const delta = now - b.last
    const add = Math.floor(delta / 1_000) * RULES[cat].rps
    if (add) {
      b.tokens = Math.min(b.tokens + add, RULES[cat].rps)
      b.last += (add / RULES[cat].rps) * 1_000
    }
  }

  const acquire = async (cat: Category): Promise<void> => {
    while (true) {
      refill(cat)
      const b = buckets.get(cat)!
      if (b.tokens > 0) {
        b.tokens--
        return
      }
      await new Promise((r) => setTimeout(r, 50))
    }
  }

  const sync = (cat: Category, remaining: number, reset: number): void => {
    buckets.set(cat, { tokens: remaining, last: reset * 1_000 })
  }

  return { acquire, sync }
}
