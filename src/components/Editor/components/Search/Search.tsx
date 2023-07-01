import { useState, useEffect, useRef } from 'preact/hooks'
import { JSX } from 'preact'
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/react-query'

import { Option, getOptions } from '../../../../utilities/getOptions'
import Loader from '../../../Loader'
import getInitialOptions from '../../../../utilities/getInitialOptions'

interface Props {
  onSubmit: (subreddit: string) => void
  id: string
}

interface RedditNameResponse {
  names: string[]
}

function Search({ id, onSubmit }: Props): JSX.Element {
  const [subreddit, setSubreddit] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const inputId = `search-${id}`
  const listId = `list-${inputId}`

  const [suggestionsCache, setSuggestionsCache] = useState<Option[]>(() =>
    getInitialOptions(),
  )
  const { data, isInitialLoading, isLoading } = useQuery<
    RedditNameResponse,
    { message: string; reason?: string }
  >({
    queryKey: ['subreddit-search', id, subreddit],
    queryFn: ({ signal }) =>
      fetch(
        `https://www.reddit.com/api/search_reddit_names.json?query=${subreddit}`,
        { signal },
      ).then((response) => response.json()),
    enabled: !!subreddit,
  })

  useEffect(() => {
    if (!data?.names?.length) {
      return
    }

    setSuggestionsCache((prev) => {
      return getOptions([...prev.map((option) => option.value), ...data.names])
    })
  }, [data?.names])

  const handleSearchSubmit: JSX.GenericEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault()

    const subreddit = (
      new FormData(event.currentTarget).get(inputId)?.toString() || ''
    ).trim()

    if (!subreddit) {
      return
    }

    if (searchRef.current) {
      searchRef.current.value = ''
    }

    onSubmit(subreddit)
  }

  const handleInput: JSX.GenericEventHandler<HTMLInputElement> = debounce(
    (event) => {
      const value = event.target.value.trim()

      if (value.length < 3) {
        return
      }

      if (
        suggestionsCache.find(
          (option) => option.lowerCase === value.toLowerCase(),
        )
      ) {
        return
      }

      setSubreddit(value)
    },
    300,
  )

  return (
    <form action="" method="GET" onSubmit={handleSearchSubmit}>
      <fieldset>
        <label htmlFor="subreddit">search</label>
        <input
          autoComplete="off"
          id={inputId}
          list={listId}
          maxLength={38}
          name={inputId}
          onInput={handleInput}
          pattern="[a-zA-Z0-9_\-]+"
          placeholder="search subreddit"
          ref={searchRef}
          required
          type="search"
        />
        <datalist id={listId}>
          {suggestionsCache.map((option) => (
            <option key={option.lowerCase} value={option.value}>
              {option.value}
            </option>
          ))}
        </datalist>
        <button className="btn" type="submit">
          {isLoading && isInitialLoading ? <Loader size="xs" /> : <>🔍</>}
        </button>
      </fieldset>
    </form>
  )
}

export default Search
