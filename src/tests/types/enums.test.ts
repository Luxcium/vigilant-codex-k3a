import { describe, expect, it } from 'vitest'
import {
  CurrencySchema,
  ListingExchangeSchema,
  AccountTypeSchema,
  ClientAccountTypeSchema,
  AccountStatusSchema,
  TickTypeSchema,
  OptionTypeSchema,
  OptionDurationTypeSchema,
  OptionExerciseTypeSchema,
  SecurityTypeSchema,
  OrderStateFilterSchema,
  OrderActionSchema,
  OrderSideSchema,
  OrderTypeSchema,
  TimeInForceSchema,
  OrderStateSchema,
  CandleIntervalSchema,
  OrderClassSchema,
  StrategyTypeSchema
} from '../../../src/types/enums'

describe('Enums schemas', () => {
  const check = (schema: any, valid: any[], invalid: any[]) => {
    valid.forEach(v => it(`accepts ${v}`, () => expect(schema.parse(v)).toBe(v)))
    invalid.forEach(v => it(`rejects ${JSON.stringify(v)}`, () => expect(() => schema.parse(v)).toThrow()))
  }

  check(CurrencySchema, ['USD', 'CAD'], ['EUR', '', null])
  check(ListingExchangeSchema, ['TSX', 'NASDAQ'], ['NYU', 123])
  check(AccountTypeSchema, ['Cash', 'Margin'], ['Invalid', null])
  check(ClientAccountTypeSchema, ['Individual', 'Corporation'], [0, ''])
  check(AccountStatusSchema, ['Active', 'Closed'], ['Unknown', false])
  check(TickTypeSchema, ['Up', 'Down'], ['Sideways', null])
  check(OptionTypeSchema, ['Call', 'Put'], ['Foo', 1])
  check(OptionDurationTypeSchema, ['Weekly', 'LEAP'], ['Daily', null])
  check(OptionExerciseTypeSchema, ['American', 'European'], [true, ''])
  check(SecurityTypeSchema, ['Stock', 'Bond'], ['Crypto', 0])
  check(OrderStateFilterSchema, ['All', 'Open'], ['None', null])
  check(OrderActionSchema, ['Buy', 'Sell'], ['Hold', {}])
  check(OrderSideSchema, ['Buy', 'Short'], ['Cover', 2])
  check(OrderTypeSchema, ['Market', 'Limit'], ['StopLoss', 3])
  check(TimeInForceSchema, ['Day', 'FillOrKill'], ['GTCX', {}])
  check(OrderStateSchema, ['Pending', 'Executed'], ['Error', 4])
  check(CandleIntervalSchema, ['OneMinute', 'OneDay'], ['TwoDays', 5])
  check(OrderClassSchema, ['Primary', 'Limit'], ['Secondary', null])
  check(StrategyTypeSchema, ['CoveredCall', 'Straddle'], ['Butterfly', 6])
})