import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Filters from './components/Filters'
import Toaster from './components/Toaster'
import List from './components/List'
import Loader from './components/Loader'

interface RedditWikiPage {
  kind: 'wikipage' | string
  data: {
    content_md: string
  }
}

const parseSubredditsList = (
  response: RedditWikiPage | undefined,
): string[] => {
  if (!response?.data || response?.kind !== 'wikipage') {
    return []
  }

  const { content_md } = response.data

  const subredditRegex = /\/r\/(\w+)/g
  const subreddits = new Set<string>()

  let match
  while ((match = subredditRegex.exec(content_md)) !== null) {
    subreddits.add(match[1])
  }

  const uniqueSubreddits = Array.from(subreddits)

  return uniqueSubreddits
}

const App = (): JSX.Element => {
  const [subreddit, setSubreddit] = useState<string>('best')
  const { isLoading, error, data } = useQuery<
    RedditWikiPage,
    { message: string; reason?: string }
  >({
    queryKey: ['listOfSubreddits'],
    queryFn: ({ signal }) =>
      fetch(
        'https://www.reddit.com/r/ListOfSubreddits/wiki/listofsubreddits.json?json_raw=1',
        { signal },
      ).then((response) => response.json()),
  })
  const subreddits = useMemo(() => parseSubredditsList(data), [data])

  const handleSubmit = (nextSubreddit: string): void => {
    setSubreddit(nextSubreddit)
  }

  if (isLoading) return <Loader />

  if (error) return <p>An error has occurred: {error.message}</p>

  return (
    <>
      <header className="header">
        <h1 className="header__title">Redditlite:</h1>
      </header>
      <main className="main">
        <List key={subreddit} subreddit={subreddit} />
      </main>
      <Toaster />
      <Filters subreddits={subreddits} onSubmit={handleSubmit} />
    </>
  )
}

export default App
