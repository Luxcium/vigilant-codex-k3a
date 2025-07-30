import 'dotenv/config';
import { APP } from './config';
import api from './http/QuestradeApi';

(async () => {
  const candles = await api.getCandles({
    symbolId: 38738,
    start: '2024-10-01T00:00:00-04:00',
    end: '2024-10-31T00:00:00-04:00',
    interval: 'OneDay',
  });
  console.table(candles.slice(0, 5));
})();

