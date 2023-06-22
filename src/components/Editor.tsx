import { JSX } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
  children: JSX.Element
}

function Editor({ children }: Props): JSX.Element {
  const [myMix] = useState(localStorage.getItem('myMix') || '')
  const [mySelection] = useState(localStorage.getItem('mySelection') || '')
  const [isInitialized, setIsInitialized] = useState(false)

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const nextMyMix = (
      new FormData(event.currentTarget).get('my-mix')?.toString() || ''
    ).trim()

    const nextMySelection = (
      new FormData(event.currentTarget).get('my-selection')?.toString() || ''
    ).trim()

    localStorage.setItem('myMix', nextMyMix)
    localStorage.setItem('mySelection', nextMySelection)

    setIsInitialized(true)
  }

  if (!isInitialized) {
    return (
      <form className="editor" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="my-mix">my mix</label>
          <p>comma separated subreddit names</p>
          <textarea defaultValue={myMix} id="my-mix" name="my-mix" />
        </fieldset>

        <fieldset>
          <label htmlFor="my-selection">my selection</label>
          <p>comma separated subreddit names</p>
          <textarea
            defaultValue={mySelection}
            id="my-selection"
            name="my-selection"
          />
        </fieldset>

        <button className="editor__btn" type="submit">
          Save
        </button>
      </form>
    )
  }

  return children
}

export default Editor
