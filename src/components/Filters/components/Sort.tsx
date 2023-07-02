import { JSX } from 'preact'

import parseSortFromURL from '../../../utilities/parseSortFromURL'

interface Props {
  onChange: JSX.GenericEventHandler<HTMLSelectElement>
}

function Sort({ onChange }: Props): JSX.Element {
  const defaultSort = parseSortFromURL(window.location.href) || 'best'

  return (
    <form action="" method="GET">
      <fieldset>
        <label htmlFor="sort">sort</label>
        <select
          defaultValue={defaultSort}
          id="sort"
          name="sort"
          onChange={onChange}
        >
          {['best', 'hot', 'new', 'top'].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </fieldset>
    </form>
  )
}

export default Sort
