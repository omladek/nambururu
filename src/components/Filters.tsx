import { useState, useEffect } from 'preact/hooks'
import { JSX } from 'preact'
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/react-query'
import { Option, getOptions } from '../utilities/getOptions'

interface Props {
  subreddits: string[]
  onSubmit: (subreddit: string) => void
}

interface RedditNameResponse {
  names: string[]
}

function Filters({ onSubmit, subreddits }: Props): JSX.Element {
  const [subreddit, setSubreddit] = useState('')
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

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const value = (
      new FormData(event.currentTarget).get('subreddit')?.toString() || ''
    ).trim()

    if (value.length < 3) {
      return
    }

    window.scrollTo({ top: 0 })

    onSubmit(value)
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
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <fieldset className="fieldset">
            <label className="label" htmlFor="subreddit">
              search:
            </label>

            <input
              autoComplete="off"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={false}
              defaultValue="my-mix"
              id="subreddit"
              list="subreddits"
              maxLength={38}
              name="subreddit"
              onInput={handleInput}
              placeholder="search subreddit"
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

            {isLoading ? <>⌛</> : null}
          </fieldset>
        </div>

        <div className="form-group">
          <fieldset className="fieldset">
            <label className="label" htmlFor="subreddit-select">
              r/
            </label>

            <select
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={false}
              defaultValue={subreddit}
              id="subreddit-select"
              onChange={(event) => {
                window.scrollTo({ top: 0 })

                onSubmit(event.currentTarget.value)
              }}
            >
              <option value="my-mix">my-mix</option>

              {optionsCache.map((option) => (
                <option key={option.lowerCase} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>

            {isLoading ? <>⌛</> : null}
          </fieldset>
        </div>

        <div className="form-group">
          <button
            aria-label="Refresh"
            className="refresh"
            title="refresh"
            type="submit"
          >
            🔍
          </button>
        </div>
      </form>
    </footer>
  )
}

export default Filters
