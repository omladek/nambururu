import { describe, expect, it } from 'vitest'

import getSubredditsFromMarkdown from '../getSubredditsFromMarkdown'

describe('getSubredditsFromMarkdown', () => {
  it('returns list of subreddits names', () => {
    expect(
      getSubredditsFromMarkdown({
        kind: 'wikipage',
        data: {
          content_md: '\r\n/r/foo \r\n/r/bar',
        },
      }),
    ).toStrictEqual(['foo', 'bar'])
  })

  it('returns empty array if no names are parsed', () => {
    expect(
      getSubredditsFromMarkdown({
        kind: 'wikipage',
        data: {
          content_md: '\r\n/notValidSubreddit \r\n/nothing',
        },
      }),
    ).toStrictEqual([])
  })
})
