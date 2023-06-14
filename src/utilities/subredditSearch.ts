import debounce from 'lodash.debounce'
import { SearchResult } from '../types/reddit-api/SearchResult.type'
import getUniqueStrings from './getUniqueStrings'

let searcbAbortController: AbortController

const subredditSearch = async () => {
  const subreddit = document.querySelector<HTMLInputElement>('#subreddit')
  const list = document.querySelector<HTMLDataListElement>('#subreddit-list')

  if (!subreddit || !list) {
    return
  }

  const handleSearch = async (value: string): Promise<void> => {
    if (searcbAbortController) {
      searcbAbortController.abort()
    }

    try {
      searcbAbortController = new AbortController()
      const { signal } = searcbAbortController

      const response = await fetch(
        `https://www.reddit.com/search/.json?q=${value}&type=sr&raw_json=1`,
        {
          signal,
        },
      )
      const { data }: SearchResult = await response.json()

      const current: string[] = [...list.querySelectorAll('option')].map(
        (option) => option.value,
      )

      const suggestedSubreddits: string[] = data.children.map(
        (result) => result.data.display_name,
      )

      const nextSubreddits = getUniqueStrings(
        [...new Set([...current, ...suggestedSubreddits])].sort((a, b) =>
          a.localeCompare(b, 'en-US'),
        ),
      )

      if (!nextSubreddits.length) {
        return
      }

      const suggestedSubredditsHTML = nextSubreddits
        .map((title) => {
          return `<option value="${title}"></option>`
        })
        .join('')

      list.innerHTML = suggestedSubredditsHTML
    } catch (error) {
      console.error(error)
    }
  }

  subreddit.addEventListener(
    'input',
    debounce((event) => {
      const value = (event.target as HTMLInputElement).value.trim()

      if (value.length < 3) {
        return
      }

      const current: string[] = [...list.querySelectorAll('option')].map(
        (option) => option.value.toLowerCase(),
      )

      if (current.includes(value.toLowerCase())) {
        return
      }

      handleSearch(value)
    }, 300),
  )
}

export default subredditSearch
