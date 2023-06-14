import { FormEventHandler } from 'react'

const mergeAndUnique = (arr: string[]): string[] => {
  const mergedOrdered = [...arr].sort((a, b) => a.localeCompare(b, 'en-US'))

  return [...new Set(mergedOrdered)]
    .filter(Boolean)
    .filter((value) => value !== '')
}

interface Props {
  subreddits: string[]
  onSubmit: (value: string) => void
}

const Filters = ({ subreddits, onSubmit }: Props): JSX.Element => {
  const userSubreddits = (import.meta.env.VITE_SUBREDDITS || 'best').split(',')
  const options = mergeAndUnique([...subreddits, ...userSubreddits])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault()

    const value = (
      new FormData(event.currentTarget).get('subreddit')?.toString() || ''
    ).trim()

    if (value.length < 3) {
      return
    }

    onSubmit(value)
  }

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
          />
          <datalist id="subreddits">
            <option value="my-mix">my-mix</option>
            {options.map((subreddit) => (
              <option key={subreddit} value={subreddit} />
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
