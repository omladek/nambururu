const getSubredditJSONUrl = (subredditUrl: string, after = ''): URL => {
  const subredditBase =
    subredditUrl === 'best' ? subredditUrl : `r/${subredditUrl}`
  const url = new URL(`https://www.reddit.com/${subredditBase}/.json`)

  url.searchParams.append('json_raw', '1')
  url.searchParams.append('limit', '10')

  if (after) {
    url.searchParams.append('after', after)
  }

  return url
}

export default getSubredditJSONUrl
