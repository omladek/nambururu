import { useMemo, useState } from 'preact/hooks'
import { JSX } from 'preact'
import { useQuery } from '@tanstack/react-query'

import Filters from './components/Filters'
import List from './components/List'
import Loader from './components/Loader'
import getSubredditsFromMarkdown, {
  RedditWikiPage,
} from './utilities/getSubredditsFromMarkdown'

function App(): JSX.Element {
  const [settings, setSettings] = useState<{ subreddit: string; sort: string }>(
    {
      subreddit: 'best',
      sort: 'best',
    },
  )
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

  const handleSubmit = ({
    sort = 'best',
    subreddit,
  }: {
    subreddit: string
    sort?: string
  }): void => {
    setSettings({ subreddit, sort })
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
      <header className="header sr-only">
        <h1 className="header__title">Redditlite:</h1>
      </header>

      <main className="main">
        <List
          key={`${settings.subreddit}-${settings.sort}`}
          sort={settings.sort}
          subreddit={settings.subreddit}
        />
      </main>

      <Filters onSubmit={handleSubmit} subreddits={subreddits} />
    </>
  )
}

export default App
