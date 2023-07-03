import { JSX } from 'preact'
import { useState } from 'preact/hooks'

import Storage from '../constants/storage'
import getDefaultValue from '../utilities/getDefaultValue'

function EditBlockedTitleKeywords(): JSX.Element {
  const [isSaved, setIsSaved] = useState(false)
  const blockedTitleKeywords = getDefaultValue(Storage.BLOCKED_TITLE_KEYWORDS)

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
    <main className="main">
      <h1 className="title">Blocked title keywords</h1>
      <div className="block">
        <form action="" method="GET" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor={Storage.BLOCKED_TITLE_KEYWORDS}>
              blocked title keywords
            </label>
            <p>
              comma separated words; if a post title includes this word(s) it
              will not be shown
            </p>
            <textarea
              defaultValue={blockedTitleKeywords}
              id={Storage.BLOCKED_TITLE_KEYWORDS}
              name={Storage.BLOCKED_TITLE_KEYWORDS}
              onChange={() => setIsSaved(false)}
            />
          </fieldset>

          <button className="btn" type="submit">
            Save
          </button>
          {isSaved && <p>Changes were saved.</p>}
        </form>
      </div>
    </main>
  )
}

export default EditBlockedTitleKeywords
