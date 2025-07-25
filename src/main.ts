import 'dotenv/config'; // Pre-load environment variables
import axios from 'axios';
import { refreshToken } from './auth/refreshTokenUtil';

(async () => {
  try {
    const apiServer = process.env.API_SERVER || process.env.API_BASE_URL;
    if (!apiServer) {
      console.error('Missing API_SERVER or API_BASE_URL in .env');
      process.exit(1);
    }
    console.log('Using API server:', apiServer);

    // Obtain access token from env or refresh if necessary
    let accessToken = process.env.ACCESS_TOKEN;
    if (!accessToken) {
      const rt = process.env.REFRESH_TOKEN;
      if (rt) {
        console.log('No ACCESS_TOKEN found, refreshing using REFRESH_TOKEN...');
        const tokens = await refreshToken(rt);
        accessToken = tokens.accessToken;
        console.log('Successfully refreshed access token');
      } else {
        console.error(
          'Missing ACCESS_TOKEN in .env. Provide REFRESH_TOKEN to auto-refresh.'
        );
        process.exit(1);
      }
    }

    const client = axios.create({
      baseURL: apiServer,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const response = await client.get('/markets/candles', {
      params: {
        symbolId: 38738,
        start: '2024-10-01T00:00:00-04:00',
        end: '2024-10-31T00:00:00-04:00',
        interval: 'OneDay',
      },
    });

    console.log('Candles data:');
    console.table(response.data.slice(0, 5));
  } catch (error) {
    console.error('Demo error:', error);
    process.exit(1);
  }
})();
