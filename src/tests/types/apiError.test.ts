import { describe, expect, it } from 'vitest';
import { ApiErrorSchema } from '../../core/types/apiError';
import { OrderSchema } from '../../core/types/orders';

describe('ApiErrorSchema', () => {
  it('parses valid payload', () => {
    const order = OrderSchema.parse({
      id: 1,
      symbol: 'S',
      symbolId: 1,
      totalQuantity: 1,
      openQuantity: 1,
      filledQuantity: 0,
      canceledQuantity: 0,
      side: 'Buy',
      orderType: 'Market',
      limitPrice: null,
      stopPrice: null,
      isAllOrNone: false,
      isAnonymous: false,
      icebergQuantity: null,
      minQuantity: null,
      avgExecPrice: null,
      lastExecPrice: null,
      source: 'API',
      timeInForce: 'Day',
      gtdDate: null,
      state: 'Pending',
      clientReasonStr: '',
      chainId: 0,
      creationTime: 't',
      updateTime: 't',
      notes: '',
      primaryRoute: 'R',
      secondaryRoute: 'R',
      orderRoute: 'R',
      venueHoldingOrder: 'V',
      commissionCharged: 0,
      exchangeOrderId: 'E',
      isSignificantShareholder: false,
      isInsider: false,
      isLimitOffsetInDollar: false,
      userId: 0,
      placementCommission: 0,
    });
    const obj = { code: 1, message: 'err', orderId: 1, orders: [order] };
    expect(ApiErrorSchema.parse(obj)).toEqual(obj);
  });
  it('invalid payload throws', () => {
    expect(() => ApiErrorSchema.parse({})).toThrow();
  });
});
