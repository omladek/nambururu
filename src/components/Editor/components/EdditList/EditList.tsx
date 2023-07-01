import { JSX } from 'preact'
import { useState } from 'preact/hooks'

import getDefaultValue from '../../../../utilities/getDefaultValue'
import Tags from '../Tags/Tags'
import Search from '../Search/Search'
import parseListIdFromURL from '../../../../utilities/parseListIdFromURL'

interface Props {
  /** injected by router */
  url: string
}

function EditList({ url }: Props): JSX.Element {
  const id = parseListIdFromURL(url) || 'listId'
  const formId = `form-${id}`
  const [isSaved, setIsSaved] = useState(false)
  const [state, setState] = useState(getDefaultValue(id))

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
      <h1 className="title">Edit list</h1>
      <div className="block">
        <form id={formId} onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor={id}>List {id}</label>
            <p>comma separated subreddit names</p>
            <textarea
              id={id}
              name={id}
              onChange={(event) => {
                setState(event.currentTarget.value)
                setIsSaved(false)
              }}
              required
              value={state}
            />
            <Tags
              onClick={(sub) =>
                setState((prev) =>
                  prev
                    .split(',')
                    .filter(Boolean)
                    .filter((tag) => tag !== sub)
                    .join(','),
                )
              }
              value={state}
            />
          </fieldset>
        </form>

        <Search
          id={id}
          onSubmit={(query) => {
            setState((prev) =>
              [...prev.split(',').filter(Boolean), query].join(','),
            )
          }}
        />

        <button className="btn" form={formId} type="submit">
          Save
        </button>
        {isSaved && <p>Changes were saved.</p>}
      </div>
    </main>
  )
}

export default EditList
