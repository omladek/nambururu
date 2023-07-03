import { useState, useRef } from 'preact/hooks'
import { JSX } from 'preact'
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/react-query'

import Loader from '../../../Loader'
import './Search.css'

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

      setSubreddit(value)
    },
    300,
  )

  return (
    <form
      action=""
      className="search"
      method="GET"
      onSubmit={handleSearchSubmit}
    >
      <fieldset>
        <label htmlFor={inputId}>search</label>
        <div className="search__group">
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
            {!!data?.names?.length &&
              data?.names.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </datalist>
          <button
            className={`btn ${
              isLoading && isInitialLoading ? 'is-loading' : ''
            }`}
            type="submit"
          >
            {isLoading && isInitialLoading && <Loader size="xs" />}
            <span className="btn__text">🔍</span>
          </button>
        </div>
      </fieldset>
    </form>
  )
}

export default Search
