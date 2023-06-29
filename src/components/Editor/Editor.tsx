import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import Storage from '../../constants/storage'
import getDefaultValue from '../../utilities/getDefaultValue'
import './Editor.css'

function Editor(): JSX.Element {
  const [isSaved, setIsSaved] = useState(false)
  const myMix = getDefaultValue(Storage.MY_MIX)
  const mySelection = getDefaultValue(Storage.MY_SELECTION)
  const myBlockedSubreddits = getDefaultValue(Storage.MY_BLOCKED_SUBREDDITS)
  const myBlockedTitleKeywords = getDefaultValue(
    Storage.MY_BLOCKED_TITLE_KEYWORDS,
  )

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (
    event,
  ): Promise<void> => {
    event.preventDefault()

    setIsSaved(false)

    const entries = [...new FormData(event.currentTarget).entries()]

    entries.forEach(([key, value]) => {
      localStorage.setItem(key, value.toString())
    })

    await new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 500)
    })

    setIsSaved(true)
  }

  return (
    <form className="editor" onSubmit={handleSubmit}>
      <fieldset className="editor__fieldset">
        <label htmlFor={Storage.MY_MIX}>my mix</label>
        <p>comma separated subreddit names</p>
        <textarea
          defaultValue={myMix}
          id={Storage.MY_MIX}
          name={Storage.MY_MIX}
          onChange={() => setIsSaved(false)}
        />
      </fieldset>

      <fieldset className="editor__fieldset">
        <label htmlFor={Storage.MY_SELECTION}>my selection</label>
        <p>comma separated subreddit names</p>
        <textarea
          defaultValue={mySelection}
          id={Storage.MY_SELECTION}
          name={Storage.MY_SELECTION}
          onChange={() => setIsSaved(false)}
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
          onChange={() => setIsSaved(false)}
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
          onChange={() => setIsSaved(false)}
        />
      </fieldset>

      <button className="editor__btn" type="submit">
        Save
      </button>
      {isSaved && <p>Changes were saved.</p>}
    </form>
  )
}

export default Editor
