import basicSubreddits from '../constants/basicSubreddits'
import getSubredditsURLValue from './getSubredditsURLValue'

import Storage from '../constants/storage'

interface Props {
  subreddit: string
  after?: string
  sort?: string
}

const getSubredditJSONUrl = ({
  after = '',
  sort = 'best',
  subreddit,
}: Props): URL => {
  let subredditBase = subreddit
  let sortBase = sort

  if (subreddit === Storage.MY_MIX) {
    subredditBase = getSubredditsURLValue(Storage.MY_MIX)
  }

  if (subreddit === Storage.MY_SELECTION) {
    subredditBase = getSubredditsURLValue(Storage.MY_SELECTION)
  }

  subredditBase = basicSubreddits.includes(subredditBase)
    ? subredditBase
    : `r/${subredditBase}`

  if (!subredditBase.startsWith('r/')) {
    sortBase = ''
  } else if (sort === '') {
    sortBase = ``
  } else {
    sortBase = `/${sort}`
  }

  const limit = window.matchMedia('(min-width: 40em)').matches ? 100 : 50

  const url = new URL(
    `https://www.reddit.com/${subredditBase}${sortBase}/.json`,
  )

  url.searchParams.append('json_raw', '1')
  url.searchParams.append('limit', String(limit))

  if (after) {
    url.searchParams.append('after', after)
  }

  return url
}

export default getSubredditJSONUrl
