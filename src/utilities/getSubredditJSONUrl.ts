const getSubredditJSONUrl = (
  subredditUrl: string,
  after = '',
  limit: number,
): URL => {
  const subredditBase =
    subredditUrl === 'best' ? subredditUrl : `r/${subredditUrl}`
  const url = new URL(`https://www.reddit.com/${subredditBase}/.json`)

  url.searchParams.append('json_raw', '1')

  if (after) {
    url.searchParams.append('after', after)
  }

  if (limit) {
    url.searchParams.append('limit', limit.toString())
  }

  return url
}

export default getSubredditJSONUrl
