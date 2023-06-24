import { JSX } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
  children: JSX.Element
}

function Editor({ children }: Props): JSX.Element {
  const [myMix] = useState(localStorage.getItem('myMix') || '')
  const [mySelection] = useState(localStorage.getItem('mySelection') || '')
  const [myBlockedSubreddits] = useState(
    localStorage.getItem('myBlockedSubreddits') || '',
  )
  const [myBlockedTitleKeywords] = useState(
    localStorage.getItem('myBlockedTitleKeywords') || '',
  )

  const [isInitialized, setIsInitialized] = useState(false)

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const nextMyMix = (
      new FormData(event.currentTarget).get('my-mix')?.toString() || ''
    ).trim()

    const nextMySelection = (
      new FormData(event.currentTarget).get('my-selection')?.toString() || ''
    ).trim()

    const nextMyBlockedSubreddits = (
      new FormData(event.currentTarget)
        .get('my-blocked-subreddits')
        ?.toString() || ''
    ).trim()

    const nextMyBlockedTitleKeywords = (
      new FormData(event.currentTarget)
        .get('my-blocked-title-keywords')
        ?.toString() || ''
    ).trim()

    localStorage.setItem('myMix', nextMyMix)
    localStorage.setItem('mySelection', nextMySelection)
    localStorage.setItem('myBlockedSubreddits', nextMyBlockedSubreddits)
    localStorage.setItem('myBlockedTitleKeywords', nextMyBlockedTitleKeywords)

    setIsInitialized(true)
  }

  if (!isInitialized) {
    return (
      <main className="main">
        <form className="editor" onSubmit={handleSubmit}>
          <h1 className="editor__title">Settings</h1>

          <fieldset className="editor__fieldset">
            <label htmlFor="my-mix">my mix</label>
            <p>comma separated subreddit names</p>
            <textarea defaultValue={myMix} id="my-mix" name="my-mix" />
          </fieldset>

          <fieldset className="editor__fieldset">
            <label htmlFor="my-selection">my selection</label>
            <p>comma separated subreddit names</p>
            <textarea
              defaultValue={mySelection}
              id="my-selection"
              name="my-selection"
            />
          </fieldset>

          <fieldset className="editor__fieldset">
            <label htmlFor="my-blocked-subreddits">my blocked subreddits</label>
            <p>
              comma separated subreddit names which should not be shown in the
              best/top/hot list(s)
            </p>
            <textarea
              defaultValue={myBlockedSubreddits}
              id="my-blocked-subreddits"
              name="my-blocked-subreddits"
            />
          </fieldset>

          <fieldset className="editor__fieldset">
            <label htmlFor="my-blocked-title-keywords">
              my blocked title keywords
            </label>
            <p>
              comma separated words; if a post title includes this word(s) it
              will not be shown
            </p>
            <textarea
              defaultValue={myBlockedTitleKeywords}
              id="my-blocked-title-keywords"
              name="my-blocked-title-keywords"
            />
          </fieldset>

          <button className="editor__btn" type="submit">
            Save
          </button>
        </form>
      </main>
    )
  }

  return children
}

export default Editor
