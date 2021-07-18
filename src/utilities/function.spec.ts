import { noop } from './function'

test('returns undefined', () => {
  expect(noop()).toBe(undefined)
})
