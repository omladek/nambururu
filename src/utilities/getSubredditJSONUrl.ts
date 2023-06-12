const getSubredditJSONUrl = (
  subredditUrl: string,
  after: string = '',
  limit: number,
): URL => {
  const url = new URL(`https://www.reddit.com/r/${subredditUrl}/.json`)

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
