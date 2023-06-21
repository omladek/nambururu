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

  subredditBase =
    subredditBase === 'best' ? subredditBase : `r/${subredditBase}`

  if (subreddit === 'best') {
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
  url.searchParams.append('limit', '25')

  if (after) {
    url.searchParams.append('after', after)
  }

  return url
}

export default getSubredditJSONUrl
