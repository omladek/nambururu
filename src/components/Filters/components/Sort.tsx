import { JSX } from 'preact'

import parseSortFromURL from '../../../utilities/parseSortFromURL'
import sortOptions, { SortOption } from '../../../constants/sortOptions'

interface Props {
  onChange: (sort: SortOption) => void
}

function Sort({ onChange }: Props): JSX.Element {
  const defaultSort = parseSortFromURL(window.location.href) || sortOptions[0]

  return (
    <form action="" method="GET">
      <fieldset>
        <label htmlFor="sort">sort</label>
        <select
          defaultValue={defaultSort}
          id="sort"
          name="sort"
          onChange={({ currentTarget }) =>
            onChange(currentTarget.value as SortOption)
          }
        >
          <option disabled>choose</option>
          {sortOptions.map((option) => (
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
