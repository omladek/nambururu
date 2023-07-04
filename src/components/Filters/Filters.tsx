import { JSX } from 'preact'

import Search from '../Editor/components/Search/Search'
import Sort from './components/Sort'
import Nav from './components/Nav'
import './Filters.css'
import { SortOption } from '../../constants/sortOptions'

interface Props {
  onSubmit: (subreddit: string) => void
  onSort: (sort: SortOption) => void
}

function Filters({ onSort, onSubmit }: Props): JSX.Element {
  return (
    <footer className="filters">
      <Search id="suggestions" onSubmit={onSubmit} />

      <Nav onChange={({ currentTarget }) => onSubmit(currentTarget.value)} />

      <Sort onChange={onSort} />
    </footer>
  )
}

export default Filters
