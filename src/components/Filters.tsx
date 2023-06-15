import { FormEventHandler, useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import getUniqueStrings from '../utilities/getUniqueStrings'
import { useQuery } from '@tanstack/react-query'
import { SearchResult } from '../types/reddit-api/SearchResult.type'

const getOptions = (arr: string[]) =>
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

const Filters = ({ subreddits, onSubmit }: Props): JSX.Element => {
  const [subreddit, setSubreddit] = useState('')
  const [optionsCache, setOptionsCache] = useState<
    Array<{
      value: string
      lowerCase: string
    }>
  >(() => {
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
      <form method="GET" action="" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <label className="label" htmlFor="subreddit">
            subreddit:
          </label>
          <input
            list="subreddits"
            maxLength={38}
            id="subreddit"
            name="subreddit"
            defaultValue="my-mix"
            placeholder="search subreddit"
            onInput={handleInput}
            autoComplete="off"
            type="text"
          />
          <datalist id="subreddits">
            <option value="my-mix">my-mix</option>
            {optionsCache.map((subreddit) => (
              <option key={subreddit.lowerCase} value={subreddit.value} />
            ))}
          </datalist>
          <button
            type="submit"
            className="refresh"
            title="refresh"
            aria-label="Refresh"
          >
            &#8635;
          </button>
        </fieldset>
      </form>
    </footer>
  )
}

export default Filters
