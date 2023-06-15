import { FormEventHandler, useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/react-query'
import getUniqueStrings from '../utilities/getUniqueStrings'
import { SearchResult } from '../types/reddit-api/SearchResult.type'

interface Option {
  value: string
  lowerCase: string
}

const getOptions = (arr: string[]): Option[] =>
  getUniqueStrings(
    [...arr]
      .sort((a, b) => a.localeCompare(b, 'en-US'))
      .filter(Boolean)
      .filter((option) => option !== ''),
  ).map((option) => ({
    value: option,
    lowerCase: option.toLowerCase(),
  }))

interface Props {
  subreddits: string[]
  onSubmit: (value: string) => void
}

function Filters({ onSubmit, subreddits }: Props): JSX.Element {
  const [subreddit, setSubreddit] = useState('')
  const [optionsCache, setOptionsCache] = useState<Option[]>(() => {
    const userSubreddits: string[] = (
      import.meta.env.VITE_SUBREDDITS || 'best'
    ).split(',')

    return getOptions([...userSubreddits, ...subreddits])
  })
  const { data } = useQuery<SearchResult, { message: string; reason?: string }>(
    {
      queryKey: ['subreddit-search', subreddit],
      queryFn: ({ signal }) =>
        fetch(
          `https://www.reddit.com/search/.json?q=${subreddit}&type=sr&raw_json=1`,
          { signal },
        ).then((response) => response.json()),
    },
  )

  useEffect(() => {
    if (!data?.data?.children?.length) {
      return
    }

    setOptionsCache((prev) => {
      return getOptions([
        ...prev.map((option) => option.value),
        ...data.data.children.map((result) => result.data.display_name),
      ])
    })
  }, [data?.data?.children])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
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

  const handleInput: FormEventHandler<HTMLInputElement> = debounce((event) => {
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
  }, 300)

  return (
    <footer className="filters">
      <form action="" method="GET" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <label className="label" htmlFor="subreddit">
            subreddit:
          </label>

          <input
            autoComplete="off"
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

          <button
            aria-label="Refresh"
            className="refresh"
            title="refresh"
            type="submit"
          >
            &#8635;
          </button>
        </fieldset>
      </form>
    </footer>
  )
}

export default Filters
