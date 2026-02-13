import { JSX } from 'preact'
import { route } from 'preact-router'

import Filters from '../components/Filters/Filters'
import List from '../components/List'
import parseSubredditFromURL from '../utilities/parseSubredditFromURL'
import parseSortFromURL from '../utilities/parseSortFromURL'
import parseStorage from '../utilities/parseStorage'
import sortOptions from '../constants/sortOptions'
import basicSubreddits from '../constants/basicSubreddits'

interface Props {
  /** injected by router */
  url: string
}

function Home({ url }: Props): JSX.Element {
  const subreddit =
    parseSubredditFromURL(url) || parseStorage('lists')[0] || basicSubreddits[0]
  const sort = parseSortFromURL(url) || sortOptions[0]

  return (
    <>
      <main className="main">
        <h1 className="title">{subreddit}</h1>
        <List sort={sort} subreddit={subreddit} />
      </main>
      <Filters
        onSort={(nextSort) => {
          route(`/?subreddit=${subreddit}&sort=${nextSort}`)
        }}
        onSubmit={(nextSubreddit) => {
          route(`/?subreddit=${nextSubreddit}&sort=best`)
        }}
      />
    </>
  )
}

export default Home
