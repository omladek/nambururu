import { useState, useEffect, useRef } from 'preact/hooks'
import { JSX } from 'preact'
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/react-query'
import { Option, getOptions } from '../utilities/getOptions'

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
      import.meta.env.VITE_SUBREDDITS || 'best'
    ).split(',')

    return getOptions([...userSubreddits, ...subreddits])
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

    const sort = (
      new FormData(event.currentTarget).get('sort')?.toString() || ''
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
          <label className="label" htmlFor="subreddit">
            search:
          </label>
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
          <datalist id="subreddits">
            <option value="my-mix">my-mix</option>

            {optionsCache.map((option) => (
              <option key={option.lowerCase} value={option.value}>
                {option.value}
              </option>
            ))}
          </datalist>

          <button
            aria-label="Clear"
            className="filters__btn"
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
          <button
            aria-label="Refresh"
            className="filters__btn"
            title="refresh"
            type="submit"
          >
            {isLoading ? <>⌛</> : <>🔍</>}
          </button>
        </fieldset>
      </form>

      <form
        action=""
        className="form-groups"
        method="GET"
        onSubmit={handleSelectSubmit}
        ref={selectFormRef}
      >
        <fieldset className="fieldset">
          <label className="label" htmlFor="subreddit-select">
            r/
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

            {optionsCache.map((option) => (
              <option key={option.lowerCase} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <label className="label" htmlFor="sort">
            sort
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
