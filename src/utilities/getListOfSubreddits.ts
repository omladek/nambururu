let listAbortController: AbortController

const getListOfSubreddits = async (): Promise<string[]> => {
  if (listAbortController) {
    listAbortController.abort()
  }

  listAbortController = new AbortController()
  const { signal } = listAbortController

  const response = await fetch(
    'https://www.reddit.com/r/ListOfSubreddits/wiki/listofsubreddits.json?json_raw=1',
    {
      signal,
    },
  )
  const { data } = await response.json()
  const { content_md } = data

  const subredditRegex = /\/r\/(\w+)/g
  const subreddits = new Set<string>()

  let match
  while ((match = subredditRegex.exec(content_md)) !== null) {
    subreddits.add(match[1])
  }

  const uniqueSubreddits = Array.from(subreddits)

  return uniqueSubreddits
}

export default getListOfSubreddits
