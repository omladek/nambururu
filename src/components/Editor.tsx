import { JSX } from 'preact'
import Storage from '../constants/storage'
import getDefaultValue from '../utilities/getDefaultValue'

interface Props {
  onSave: () => void
}

function Editor({ onSave }: Props): JSX.Element {
  const myMix = getDefaultValue(Storage.MY_MIX)
  const mySelection = getDefaultValue(Storage.MY_SELECTION)
  const myBlockedSubreddits = getDefaultValue(Storage.MY_BLOCKED_SUBREDDITS)
  const myBlockedTitleKeywords = getDefaultValue(
    Storage.MY_BLOCKED_TITLE_KEYWORDS,
  )

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const entries = [...new FormData(event.currentTarget).entries()]

    entries.forEach(([key, value]) => {
      localStorage.setItem(key, value.toString())
    })

    onSave()
  }

  return (
    <main className="main">
      <form className="editor" onSubmit={handleSubmit}>
        <h2 className="editor__title">Settings</h2>

        <fieldset className="editor__fieldset">
          <label htmlFor={Storage.MY_MIX}>my mix</label>
          <p>comma separated subreddit names</p>
          <textarea
            defaultValue={myMix}
            id={Storage.MY_MIX}
            name={Storage.MY_MIX}
          />
        </fieldset>

        <fieldset className="editor__fieldset">
          <label htmlFor={Storage.MY_SELECTION}>my selection</label>
          <p>comma separated subreddit names</p>
          <textarea
            defaultValue={mySelection}
            id={Storage.MY_SELECTION}
            name={Storage.MY_SELECTION}
          />
        </fieldset>

        <fieldset className="editor__fieldset">
          <label htmlFor={Storage.MY_BLOCKED_SUBREDDITS}>
            my blocked subreddits
          </label>
          <p>
            comma separated subreddit names which should not be shown in the
            best/top/hot list(s)
          </p>
          <textarea
            defaultValue={myBlockedSubreddits}
            id={Storage.MY_BLOCKED_SUBREDDITS}
            name={Storage.MY_BLOCKED_SUBREDDITS}
          />
        </fieldset>

        <fieldset className="editor__fieldset">
          <label htmlFor={Storage.MY_BLOCKED_TITLE_KEYWORDS}>
            my blocked title keywords
          </label>
          <p>
            comma separated words; if a post title includes this word(s) it will
            not be shown
          </p>
          <textarea
            defaultValue={myBlockedTitleKeywords}
            id={Storage.MY_BLOCKED_TITLE_KEYWORDS}
            name={Storage.MY_BLOCKED_TITLE_KEYWORDS}
          />
        </fieldset>

        <button className="editor__btn" type="submit">
          Save
        </button>
      </form>
    </main>
  )
}

export default Editor
