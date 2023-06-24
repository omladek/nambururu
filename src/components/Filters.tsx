import { useState, useEffect, useRef } from 'preact/hooks'
import { JSX } from 'preact'
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/react-query'
import { Option, getOptions } from '../utilities/getOptions'
import Loader from './Loader'
import getInitialOptions from '../utilities/getInitialOptions'
import Storage from '../constants/storage'

interface Props {
  onSubmit: (subreddit: string) => void
  onSort: (sort: string) => void
  onToggleSettings: () => void
}

interface RedditNameResponse {
  names: string[]
}

function Filters({ onSort, onSubmit, onToggleSettings }: Props): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null)
  const selectFormRef = useRef<HTMLFormElement>(null)
  const [subreddit, setSubreddit] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const [optionsCache, setOptionsCache] = useState<Option[]>(() =>
    getInitialOptions(),
  )
  const [suggestionsCache, setSuggestionsCache] = useState<Option[]>(() =>
    getInitialOptions(),
  )
  const { data, isInitialLoading, isLoading } = useQuery<
    RedditNameResponse,
    { message: string; reason?: string }
  >({
    queryKey: ['subreddit-search', subreddit],
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
      new FormData(event.currentTarget).get('subreddit')?.toString() || ''
    ).trim()

    if (!subreddit) {
      return
    }

    setOptionsCache((prev) => {
      return getOptions([...prev.map((option) => option.value), subreddit])
    })

    window.scrollTo({ top: 0 })

    onSubmit(subreddit)
  }

  const handleSelectSubmit: JSX.GenericEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault()

    const subreddit = (
      new FormData(event.currentTarget).get('subreddit-select')?.toString() ||
      ''
    ).trim()

    if (!subreddit) {
      return
    }

    window.scrollTo({ top: 0 })

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
    <footer className="filters">
      <form
        action=""
        className="form-groups"
        method="GET"
        onSubmit={handleSearchSubmit}
        ref={formRef}
      >
        <fieldset className="fieldset">
          <label className="label label--touch" htmlFor="subreddit">
            <span className="label__title">search</span>
          </label>
          <div className="search">
            <input
              autoComplete="off"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={false}
              id="subreddit"
              list="subreddits"
              maxLength={38}
              name="subreddit"
              onInput={handleInput}
              placeholder="search subreddit"
              ref={searchRef}
              type="text"
            />
            <button
              aria-label="Clear"
              className="filters__btn search__btn"
              onClick={() => {
                if (!searchRef.current) {
                  return
                }

                searchRef.current.value = ''

                searchRef.current.focus()
              }}
              title="CLear"
              type="button"
            >
              ❌
            </button>
          </div>
          <datalist id="subreddits">
            <option value={Storage.MY_MIX}>my-mix</option>
            <option value={Storage.MY_SELECTION}>my-selection</option>

            {suggestionsCache.map((option) => (
              <option key={option.lowerCase} value={option.value}>
                {option.value}
              </option>
            ))}
          </datalist>
          <button
            aria-label="Refresh"
            className="filters__btn"
            title="refresh"
            type="submit"
          >
            {isLoading && isInitialLoading ? <Loader size="xs" /> : <>🔍</>}
          </button>
        </fieldset>
      </form>

      <form
        action=""
        className="form-groups form-groups--equal"
        method="GET"
        onSubmit={handleSelectSubmit}
        ref={selectFormRef}
      >
        <fieldset className="fieldset">
          <label className="label" htmlFor="subreddit-select">
            <span className="label__title">r/</span>
          </label>

          <select
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={false}
            defaultValue={subreddit}
            id="subreddit-select"
            name="subreddit-select"
            onChange={(event) => {
              if (selectFormRef.current) {
                const nextSubreddit = event.currentTarget.value

                window.scrollTo({ top: 0 })
                onSubmit(nextSubreddit)
              }
            }}
          >
            <option value={Storage.MY_MIX}>my-mix</option>
            <option value={Storage.MY_SELECTION}>my-selection</option>

            {optionsCache.map((option) => (
              <option key={option.lowerCase} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <label className="label" htmlFor="sort">
            <span className="label__title">sort</span>
          </label>

          <select
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={false}
            defaultValue="best"
            id="sort"
            name="sort"
            onChange={(event) => {
              if (selectFormRef.current) {
                const nextSort = event.currentTarget.value

                window.scrollTo({ top: 0 })
                onSort(nextSort)
              }
            }}
          >
            {['best', 'hot', 'new', 'top'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </fieldset>

        <div className="fieldset">
          <button
            className="filters__settings"
            onClick={onToggleSettings}
            title="settings"
            type="button"
          >
            ⚙<span className="sr-only">Settings</span>
          </button>
        </div>
      </form>
    </footer>
  )
}

export default Filters
