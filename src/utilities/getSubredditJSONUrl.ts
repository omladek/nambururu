import basicSubreddits from '../constants/basicSubreddits'

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

  if (subreddit === 'my-mix') {
    subredditBase = (import.meta.env.VITE_SUBREDDITS || 'best')
      .split(',')
      .join('+')
  }

  if (subreddit === 'my-selection') {
    subredditBase = (import.meta.env.VITE_SUBREDDITS_SELECTION || 'best')
      .split(',')
      .join('+')
  }

  subredditBase = basicSubreddits.includes(subredditBase)
    ? subredditBase
    : `r/${subredditBase}`

  if (basicSubreddits.includes(subreddit)) {
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
