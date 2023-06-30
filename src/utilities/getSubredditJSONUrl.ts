import basicSubreddits from '../constants/basicSubreddits'
import getSubredditsURLValue from './getSubredditsURLValue'
import parseStorage from './parseStorage'

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

  const lists = parseStorage('lists')

  if (lists.includes(subreddit)) {
    subredditBase = getSubredditsURLValue(subreddit)
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

  const url = new URL(
    `https://www.reddit.com/${subredditBase}${sortBase}/.json`,
  )

  url.searchParams.append('json_raw', '1')
  url.searchParams.append('limit', '100')

  if (after) {
    url.searchParams.append('after', after)
  }

  return url
}

export default getSubredditJSONUrl
