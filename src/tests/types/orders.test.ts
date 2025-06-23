import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import {
  OrderLegSchema,
  OrderSchema
} from '../../../src/types/orders'

describe('Order related schemas', () => {
  it('valid OrderLegSchema parses', () => {
    const obj = {
      strategyType: 'CoveredCall',
      triggerStopPrice: null,
      orderGroupId: 1,
      orderClass: 'Primary'
    }
    expect(OrderLegSchema.parse(obj)).toEqual(obj)
  })
  it('invalid OrderLegSchema throws', () => {
    expect(() => OrderLegSchema.parse({})).toThrow()
  })

  it('valid OrderSchema parses without legs', () => {
    const obj = {
      id: 1,
      symbol: 'ABC',
      symbolId: 2,
      totalQuantity: 10,
      openQuantity: 5,
      filledQuantity: 5,
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
      primaryRoute: 'R1',
      secondaryRoute: 'R2',
      orderRoute: 'R3',
      venueHoldingOrder: 'V',
      commissionCharged: 0,
      exchangeOrderId: 'E',
      isSignificantShareholder: false,
      isInsider: false,
      isLimitOffsetInDollar: false,
      userId: 10,
      placementCommission: 1
    }
    expect(OrderSchema.parse(obj)).toMatchObject(obj)
  })
  it('valid OrderSchema parses with legs', () => {
    const leg = OrderLegSchema.parse({
      strategyType: 'CoveredCall',
      triggerStopPrice: null,
      orderGroupId: 1,
      orderClass: 'Primary'
    })
    const base = {
      id: 1,
      symbol: 'ABC',
      symbolId: 2,
      totalQuantity: 10,
      openQuantity: 5,
      filledQuantity: 5,
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
      primaryRoute: 'R1',
      secondaryRoute: 'R2',
      orderRoute: 'R3',
      venueHoldingOrder: 'V',
      commissionCharged: 0,
      exchangeOrderId: 'E',
      isSignificantShareholder: false,
      isInsider: false,
      isLimitOffsetInDollar: false,
      userId: 10,
      placementCommission: 1
    }
    const obj = { ...base, legs: [leg] }
    expect(OrderSchema.parse(obj)).toEqual(obj)
  })
  it('invalid OrderSchema throws', () => {
    expect(() => OrderSchema.parse({})).toThrow()
  })
})