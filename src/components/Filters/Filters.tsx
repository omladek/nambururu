import { JSX } from 'preact'

import Search from '../Editor/components/Search/Search'
import Sort from './components/Sort'
import Nav from './components/Nav'
import './Filters.css'

interface Props {
  onSubmit: (subreddit: string) => void
  onSort: (sort: string) => void
}

function Filters({ onSort, onSubmit }: Props): JSX.Element {
  return (
    <footer className="filters">
      <Search id="suggestions" onSubmit={onSubmit} />

      <Nav onChange={({ currentTarget }) => onSubmit(currentTarget.value)} />

      <Sort onChange={({ currentTarget }) => onSort(currentTarget.value)} />
    </footer>
  )
}

export default Filters
