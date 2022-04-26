//import type * as Palindrome from '../utils/for_testing'

//const { palindrome } = jest.requireActual<typeof Palindrome>('../utils/for_testing')

import { palindrome } from '../utils/for_testing'

//const palindrome = for_testing.palindrome

test('palindrome of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})