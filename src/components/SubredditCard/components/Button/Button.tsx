import { JSX } from 'preact'
import { useState } from 'preact/hooks'

import addToStorage from '../../../../utilities/addToStorage'
import isInStorage from '../../../../utilities/isInStorage'
import removeFromStorage from '../../../../utilities/removeFromStorage'
import Storage from '../../../../constants/storage'

interface Props {
  storageKey: Storage
  value: string
}

function Button({ storageKey, value }: Props): JSX.Element {
  const [isActive, setIsActive] = useState(isInStorage(storageKey, value))

  const handleClick = (): void => {
    if (isActive) {
      removeFromStorage(storageKey, value)
    } else {
      addToStorage(storageKey, value)
    }

    setIsActive((prev) => !prev)
  }

  return (
    <button className="subreddit-card__btn" onClick={handleClick} type="button">
      <span aria-hidden>{isActive ? '➖' : '➕'} </span>{' '}
      <span className="sr-only">{isActive ? 'remove from' : 'add to'}</span>
      {storageKey}
    </button>
  )
}

export default Button
