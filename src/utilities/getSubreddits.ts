import {
  SubredditsResult,
  Subreddit,
} from '../types/reddit-api/SubredditsResult.type'
import getFilteredSubreddits from './getFilteredSubreddits'

interface Props {
  after: string
  signal: AbortSignal | undefined
}

const getSubreddits = ({
  after,
  signal,
}: Props): Promise<{ items: Subreddit[]; after: string | null }> =>
  fetch(
    `https://www.reddit.com/reddits/.json?limit=100&json_raw=1${
      after ? `&after=${after}` : ''
    }`,
    {
      signal,
    },
  )
    .then((response) => response.json())
    .then((response: SubredditsResult) => {
      if (
        typeof response !== 'object' ||
        typeof response.data !== 'object' ||
        !Array.isArray(response.data.children)
      ) {
        throw new Error(JSON.stringify(response, null, 2))
      }

      return {
        items: getFilteredSubreddits(response.data.children),
        after: response.data.after,
      }
    })
    .catch((err) => {
      if (err.name !== 'AbortError') {
        throw new Error(err.reason || err.message)
      }

      return {
        items: [],
        after: null,
      }
    })

export default getSubreddits
