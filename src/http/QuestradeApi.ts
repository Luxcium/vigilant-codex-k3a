import client from './client';

export class QuestradeApi {
  async getCandles(params: {
    symbolId: number;
    start: string;
    end: string;
    interval: string;
  }) {
    const response = await client.get('/markets/candles', { params });
    return response.data;
  }

  // Add other API methods as needed
}

export default new QuestradeApi();
