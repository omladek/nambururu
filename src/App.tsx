import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Filters from './components/Filters'
import Toaster from './components/Toaster'
import List from './components/List'
import Loader from './components/Loader'
import getSubredditsFromMarkdown, {
  RedditWikiPage,
} from './utilities/getSubredditsFromMarkdown'

function App(): JSX.Element {
  const [subreddit, setSubreddit] = useState<string>('best')
  const { data, error, isLoading } = useQuery<
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
  const subreddits = useMemo(
    () => (data ? getSubredditsFromMarkdown(data) : []),
    [data],
  )

  const handleSubmit = (nextSubreddit: string): void => {
    setSubreddit(nextSubreddit)
  }

  if (isLoading) return <Loader />

  if (error) {
    return (
      <p>
        An error has occurred:
        {error.message}
      </p>
    )
  }

  return (
    <>
      <header className="header">
        <h1 className="header__title">Redditlite:</h1>
      </header>

      <main className="main">
        <List key={subreddit} subreddit={subreddit} />
      </main>

      <Toaster />

      <Filters onSubmit={handleSubmit} subreddits={subreddits} />
    </>
  )
}

export default App
