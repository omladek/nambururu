import { JSX } from 'preact'
import { route } from 'preact-router'
import { useSwipeable } from 'react-swipeable'

import Filters from '../components/Filters/Filters'
import List from '../components/List'
import parseSubredditFromURL from '../utilities/parseSubredditFromURL'
import parseSortFromURL from '../utilities/parseSortFromURL'
import parseStorage from '../utilities/parseStorage'
import sortOptions from '../constants/sortOptions'
import basicSubreddits from '../constants/basicSubreddits'
import getSubredditsFromUserLists from '../utilities/getSubredditsFromUserLists'

interface Props {
  /** injected by router */
  url: string
}

function Home({ url }: Props): JSX.Element {
  const subreddit =
    parseSubredditFromURL(url) || parseStorage('lists')[0] || basicSubreddits[0]
  const sort = parseSortFromURL(url) || sortOptions[0]
  const userLists = parseStorage('lists') || []
  const subreddits = getSubredditsFromUserLists(userLists)
  const allSubreddits = [...userLists, ...subreddits]
  const currentSubredditIndex = allSubreddits.indexOf(subreddit) || 0

  const goToSubredditByIndex = (index: number): void => {
    const nextSubreddit = allSubreddits.at(index) || allSubreddits[0]

    route(`/?subreddit=${nextSubreddit}&sort=best`)
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const nextSubredditIndex = currentSubredditIndex - 1

      goToSubredditByIndex(nextSubredditIndex)
    },
    onSwipedRight: () => {
      const nextSubredditIndex = currentSubredditIndex + 1

      goToSubredditByIndex(nextSubredditIndex)
    },
  })

  return (
    <>
      <main
        className="main"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...swipeHandlers}
      >
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
