import { JSX } from 'preact'
import { useState } from 'preact/hooks'

import Storage from '../../../../constants/storage'
import getDefaultValue from '../../../../utilities/getDefaultValue'
import Tags from '../Tags/Tags'
import Search from '../Search/Search'

function EditBlockedSubreddits(): JSX.Element {
  const formId = 'editBlockedSubreddits'
  const [isSaved, setIsSaved] = useState(false)
  const [myBlockedSubreddits, setMyBlockedSubreddits] = useState(
    getDefaultValue(Storage.BLOCKED_SUBREDDITS),
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
    <main className="main">
      <h1 className="title">Blocked subreddits</h1>
      <div className="block">
        <form action="" id={formId} method="GET" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor={Storage.BLOCKED_SUBREDDITS}>
              blocked subreddits
            </label>
            <p>
              comma separated subreddit names which should not be shown in the
              best/top/hot list(s)
            </p>
            <textarea
              id={Storage.BLOCKED_SUBREDDITS}
              name={Storage.BLOCKED_SUBREDDITS}
              onChange={(event) => {
                setMyBlockedSubreddits(event.currentTarget.value)
                setIsSaved(false)
              }}
              value={myBlockedSubreddits}
            />
            <Tags
              onClick={(sub) =>
                setMyBlockedSubreddits((prev) =>
                  prev
                    .split(',')
                    .filter(Boolean)
                    .filter((tag) => tag !== sub)
                    .join(','),
                )
              }
              value={myBlockedSubreddits}
            />
          </fieldset>
        </form>

        <Search
          id={Storage.BLOCKED_SUBREDDITS}
          onSubmit={(query) => {
            setMyBlockedSubreddits((prev) =>
              [...prev.split(',').filter(Boolean), query].join(','),
            )
          }}
        />

        <button form={formId} type="submit">
          Save
        </button>
        {isSaved && <p>Changes were saved.</p>}
      </div>
    </main>
  )
}

export default EditBlockedSubreddits
