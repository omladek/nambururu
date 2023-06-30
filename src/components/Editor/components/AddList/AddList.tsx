import { JSX } from 'preact'

interface Props {
  onSubmit: (listId: string) => void
  lists: string[]
}

function AddList({ lists, onSubmit }: Props): JSX.Element {
  const inputId = 'list-name'

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const listName = (
      new FormData(event.currentTarget).get(inputId)?.toString() || ''
    ).trim()

    if (!listName) {
      return
    }

    const isExisting = lists.includes(listName)

    if (isExisting) {
      // eslint-disable-next-line no-alert
      alert(
        `List "${listName}" already exists! Please choose a different name.`,
      )
      return
    }

    onSubmit(listName)
  }

  return (
    <form action="" method="GET" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Create new list</legend>
        <label htmlFor={inputId}>Name</label>
        <input
          autoComplete="off"
          id={inputId}
          maxLength={38}
          name={inputId}
          pattern="[a-zA-Z0-9_\-]+"
          required
          type="text"
        />
        <p>
          <small>Allowed: letters, numbers</small>
        </p>
        <button type="submit">Create</button>
      </fieldset>
    </form>
  )
}

export default AddList
