import getSubredditJSONUrl from './getSubredditJSONUrl'
import {
  ThreadResult,
  NormalizedPost,
} from '../types/reddit-api/ThreadsResult.type'
import getPosts from './getPosts'

interface Props {
  subreddit: string
  after: string
  sort: string
  signal: AbortSignal | undefined
}

const getSubreddit = async ({
  after,
  signal,
  sort,
  subreddit,
}: Props): Promise<{ posts: NormalizedPost[]; after: string | null }> => {
  const result = await fetch(getSubredditJSONUrl({ subreddit, after, sort }), {
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
        posts: getPosts(response.data.children),
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

  if (result.posts.length < 4 && result.after) {
    return getSubreddit({ after: result.after, signal, sort, subreddit })
  }

  return result
}

export default getSubreddit
