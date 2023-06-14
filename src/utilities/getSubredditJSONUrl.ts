const getSubredditJSONUrl = (subreddit: string, after = ''): URL => {
  let subredditBase = subreddit

  if (subreddit === 'my-mix') {
    subredditBase = (import.meta.env.VITE_SUBREDDITS || 'best')
      .split(',')
      .join('+')
  }

  subredditBase =
    subredditBase === 'best' ? subredditBase : `r/${subredditBase}`

  const url = new URL(`https://www.reddit.com/${subredditBase}/.json`)

  url.searchParams.append('json_raw', '1')
  url.searchParams.append('limit', '10')

  if (after) {
    url.searchParams.append('after', after)
  }

  return url
}

export default getSubredditJSONUrl
