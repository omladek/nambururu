import getSubredditJSONUrl from './getSubredditJSONUrl'
import { ThreadResult, Thread } from '../types/reddit-api/ThreadsResult.type'
import getFilteredPosts from './getFilteredPosts'

interface Props {
  subreddit: string
  after: string
  sort: string
  signal: AbortSignal | undefined
}

const getSubreddit = ({
  after,
  signal,
  sort,
  subreddit,
}: Props): Promise<{ posts: Thread[]; after: string | null }> =>
  fetch(getSubredditJSONUrl({ subreddit, after, sort }), {
    signal,
  })
    .then((response) => response.json())
    .then((response: ThreadResult) => {
      if (
        typeof response !== 'object' ||
        typeof response.data !== 'object' ||
        !Array.isArray(response.data.children)
      ) {
        throw new Error(JSON.stringify(response, null, 2))
      }

      return {
        posts: getFilteredPosts(response.data.children),
        after: response.data.after,
      }
    })
    .catch((err) => {
      if (err.name !== 'AbortError') {
        throw new Error(err.reason || err.message)
      }

      return {
        posts: [],
        after: null,
      }
    })

export default getSubreddit
