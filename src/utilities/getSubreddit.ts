import getSubredditJSONUrl from './getSubredditJSONUrl'
import { DEFAULT_LIMIT } from '../app'

import { ThreadResult, Thread } from '../types/reddit-api/ThreadsResult.type'

let filtersAbortController: AbortController

const getSubreddit = async (
  subreddit: string,
  afterParameter = '',
  limit: number = DEFAULT_LIMIT,
): Promise<{
  posts: Thread[]
  after: string | null
  message: string | null
}> => {
  if (filtersAbortController) {
    filtersAbortController.abort()
  }

  filtersAbortController = new AbortController()
  const { signal } = filtersAbortController

  const { posts, after, message } = await fetch(
    getSubredditJSONUrl(subreddit, afterParameter, limit),
    {
      signal,
    },
  )
    .then((response) => response.json())
    .then((response: ThreadResult) => {
      if (
        typeof response !== 'object' ||
        typeof response.data !== 'object' ||
        !Array.isArray(response.data.children)
      ) {
        return {
          posts: [],
          after: null,
          message: 'Subreddit is empty or private.',
        }
      }

      return {
        posts: response.data.children,
        after: response.data.after,
        message: null,
      }
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        return {
          posts: [],
          after: null,
          message: null,
        }
      }

      console.error(error)

      return {
        posts: [],
        after: null,
        message: error.reason || error.message,
      }
    })

  return { posts, after, message }
}

export default getSubreddit
