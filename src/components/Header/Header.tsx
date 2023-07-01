import { JSX } from 'preact'

import './Header.css'
import Link from '../Link'

function Header(): JSX.Element {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-list-item">
            <Link className="header__logo" href="/nambururu/#/">
              Nambururu
            </Link>
          </li>
          <li className="header__nav-list-item">
            <Link
              activeClassName="is-active"
              className="header__nav-list-item-link"
              href="/nambururu/#/"
            >
              Home
            </Link>
          </li>
          <li className="header__nav-list-item">
            <Link
              activeClassName="is-active"
              className="header__nav-list-item-link"
              href="/nambururu/#/settings/"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
