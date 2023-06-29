import { JSX } from 'preact'
import { route } from 'preact-router'

import Storage from '../constants/storage'
import Filters from './Filters'
import List from './List'
import parseSubredditFromURL from '../utilities/parseSubredditFromURL'
import parseSortFromURL from '../utilities/parseSortFromURL'

interface Props {
  /** injected by router */
  url: string
}

function Home({ url }: Props): JSX.Element {
  const subreddit = parseSubredditFromURL(url) || Storage.MY_MIX
  const sort = parseSortFromURL(url) || 'best'

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
