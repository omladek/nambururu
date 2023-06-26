import { describe, test, expect } from 'vitest'

import parseSubredditFromURL from '../parseSubredditFromURL'

describe('parseSubredditFromURL', () => {
  test('should extract the subreddit value from the input string', () => {
    const input = '/?subreddit=AmItheAsshole'
    const subreddit = parseSubredditFromURL(input)
    expect(subreddit).toBe('AmItheAsshole')
  })

  test('should return null if subreddit parameter is not found', () => {
    const input = '/?query=test'
    const subreddit = parseSubredditFromURL(input)
    expect(subreddit).toBeNull()
  })
})
