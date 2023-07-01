import { JSX } from 'preact'
import { useState } from 'preact/hooks'

import AddList from '../AddList/AddList'
import Link from '../../../Link'

function Lists(): JSX.Element | null {
  const [lists, setLists] = useState(
    (localStorage.getItem('lists') || '').split(',').filter(Boolean),
  )

  const removeFromLists = (id: string): void => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const result = confirm('Are you sure?')

    if (!result) {
      return
    }

    setLists((prevLists) => {
      const nextLists = prevLists.filter((list) => list !== id).filter(Boolean)

      localStorage.setItem('lists', nextLists.join(','))

      localStorage.removeItem(id)

      return nextLists
    })
  }

  const addToLists = (id: string): void => {
    setLists((prevLists) => {
      const nextLists = [...prevLists, id]

      localStorage.setItem('lists', nextLists.join(','))

      return nextLists
    })
  }

  return (
    <main className="main">
      <h1 className="title">My lists</h1>
      <div className="block">
        {lists.length ? (
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th colSpan={2}>actions</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((list) => {
                return (
                  <tr key={list}>
                    <td>{list}</td>
                    <td>
                      <Link href={`/nambururu/#/edit/?list=${list}`}>edit</Link>
                    </td>
                    <td>
                      <button
                        onClick={() => removeFromLists(list)}
                        type="button"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <p>No lists.</p>
        )}

        <AddList
          key={`lists-${lists.join(',')}`}
          lists={lists}
          onSubmit={addToLists}
        />
      </div>
    </main>
  )
}

export default Lists
