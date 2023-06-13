import { SearchResult } from '../types/reddit-api/SearchResult.type'

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
      const current: string[] = [...list.querySelectorAll('option')].map(
        (option) => option.value.toLowerCase(),
      )

      if (current.includes(value.toLowerCase())) {
        return
      }

      searcbAbortController = new AbortController()
      const { signal } = searcbAbortController

      const response = await fetch(
        `https://www.reddit.com/search/.json?q=${value}&type=sr&raw_json=1`,
        {
          signal,
        },
      )
      const { data }: SearchResult = await response.json()

      const subreddits: string[] = data.children
        .map((result) => result.data.display_name)
        .filter(
          (suggestedSubreddit) =>
            !current.includes(suggestedSubreddit.toLowerCase()),
        )
        .sort((a, b) => a.localeCompare(b, 'en-US'))

      if (!subreddits.length) {
        return
      }

      const foundSubredditsHTML = subreddits
        .map((title) => {
          return `<option value="${title}">${title}</option>`
        })
        .join('')

      list.innerHTML += foundSubredditsHTML
    } catch (error) {
      console.error(error)
    }
  }

  subreddit.addEventListener('input', (event) => {
    const value = (event.target as HTMLInputElement).value

    if (value.length > 3) {
      handleSearch(value)
    }
  })
}

export default subredditSearch
