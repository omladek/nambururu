import { describe, test, expect } from 'vitest'

import parseSortFromURL from '../parseSortFromURL'

describe('parseSortFromURL', () => {
  test('should extract the sort value from the input string', () => {
    const input = '/?subreddit=AmItheAsshole&sort=best'
    const subreddit = parseSortFromURL(input)
    expect(subreddit).toBe('best')
  })

  test('should return null if sort parameter is not found', () => {
    const input = '/?query=test'
    const subreddit = parseSortFromURL(input)
    expect(subreddit).toBeNull()
  })
})
