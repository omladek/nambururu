import { useState, useEffect, useRef } from 'preact/hooks'
import { JSX } from 'preact'
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/react-query'
import { Option, getOptions } from '../utilities/getOptions'
import basicSubreddits from '../constants/basicSubreddits'
import Loader from './Loader'

interface Props {
  subreddits: string[]
  onSubmit: (payload: { subreddit: string; sort: string }) => void
}

interface RedditNameResponse {
  names: string[]
}

function Filters({ onSubmit, subreddits }: Props): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null)
  const selectFormRef = useRef<HTMLFormElement>(null)
  const [subreddit, setSubreddit] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const [optionsCache, setOptionsCache] = useState<Option[]>(() => {
    const userSubreddits: string[] = (
      localStorage.getItem('myMix') || 'best'
    ).split(',')

    const userSubredditsSelection: string[] = (
      localStorage.getItem('mySelection') || ''
    ).split(',')

    return getOptions([
      ...userSubreddits,
      ...userSubredditsSelection,
      ...subreddits,
      ...basicSubreddits,
    ])
  })
  const { data, isLoading } = useQuery<
    RedditNameResponse,
    { message: string; reason?: string }
  >({
    queryKey: ['subreddit-search', subreddit],
    queryFn: ({ signal }) =>
      fetch(
        `https://www.reddit.com/api/search_reddit_names.json?query=${subreddit}`,
        { signal },
      ).then((response) => response.json()),
  })

  useEffect(() => {
    if (!data?.names?.length) {
      return
    }

    setOptionsCache((prev) => {
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

    const sort = selectFormRef.current
      ? (
          new FormData(selectFormRef.current).get('sort')?.toString() || ''
        ).trim()
      : 'best'

    if (!subreddit) {
      return
    }

    window.scrollTo({ top: 0 })

    onSubmit({ subreddit, sort })
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

    const sort = (
      new FormData(event.currentTarget).get('sort')?.toString() || 'best'
    ).trim()

    window.scrollTo({ top: 0 })

    onSubmit({ subreddit, sort })
  }

  const handleInput: JSX.GenericEventHandler<HTMLInputElement> = debounce(
    (event) => {
      const value = event.target.value.trim()

      if (value.length < 3) {
        return
      }

      if (
        optionsCache.find((option) => option.lowerCase === value.toLowerCase())
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
            <option value="my-mix">my-mix</option>
            <option value="my-selection">my-selection</option>

            {optionsCache.map((option) => (
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
            {isLoading ? <Loader size="xs" /> : <>🔍</>}
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
                const nextSort =
                  new FormData(selectFormRef.current).get('sort')?.toString() ||
                  'best'

                window.scrollTo({ top: 0 })
                onSubmit({ subreddit: nextSubreddit, sort: nextSort })
              }
            }}
          >
            <option value="my-mix">my-mix</option>
            <option value="my-selection">my-selection</option>

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
                const nextSubreddit =
                  new FormData(selectFormRef.current)
                    .get('subreddit-select')
                    ?.toString() || ''

                window.scrollTo({ top: 0 })
                onSubmit({ subreddit: nextSubreddit, sort: nextSort })
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
      </form>
    </footer>
  )
}

export default Filters
