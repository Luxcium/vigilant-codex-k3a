import { QuestradeClient } from '../src/client/QuestradeClient';

(async () => {
  const qt = new QuestradeClient({
    clientId: process.env.QT_CLIENT_ID!,
    refreshToken: process.env.QT_REFRESH_TOKEN!,
    provider: {
      // dummy provider for example
      authorizeUrl: () => '',
      exchangeCode: async () => {
        throw new Error('not implemented');
      },
      refreshToken: async () => {
        throw new Error('not implemented');
      },
    },
  });
  console.log('Server time:', (await qt.time()).toISOString());
})();
