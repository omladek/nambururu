import { describe, test, expect } from 'vitest'
import containsKeyword from '../containsKeyword'

describe('containsKeyword', () => {
  test('should return true if sentence contains any keyword', () => {
    const keywords = ['apple', 'banana', 'orange']
    const sentence = 'I like to eat bananas and oranges.'
    const result = containsKeyword(keywords, sentence)
    expect(result).toBeTruthy()
  })

  test('should return false if sentence does not contain any keyword', () => {
    const keywords = ['apple', 'banana', 'orange']
    const sentence = 'I prefer strawberries and grapes.'
    const result = containsKeyword(keywords, sentence)
    expect(result).toBeFalsy()
  })
})
