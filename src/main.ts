import 'dotenv/config'; // Pre-load environment variables
import api from './http/QuestradeApi';

(async () => {
  try {
    const candles = await api.getCandles({
      symbolId: 38738,
      start: '2024-10-01T00:00:00-04:00',
      end: '2024-10-31T00:00:00-04:00',
      interval: 'OneDay',
    });
    console.table(candles.slice(0, 5));
  } catch (error) {
    console.error('Error fetching candles:', error);
  }
})();
