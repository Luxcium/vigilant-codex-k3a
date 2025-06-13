import { OAuthTokens, TokenStore } from '../interfaces';

export const chainStores = (...stores: TokenStore[]): TokenStore => {
  return {
    async load() {
      for (const s of stores) {
        const t = await s.load();
        if (t) return t;
      }
      return null;
    },
    async save(t: OAuthTokens) {
      await Promise.all(stores.map((s) => s.save(t)));
    },
    async clear() {
      await Promise.all(stores.map((s) => s.clear()));
    }
  };
};
