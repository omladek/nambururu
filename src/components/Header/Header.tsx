import { JSX } from 'preact'
import { Link } from 'preact-router/match'

import './Header.css'

function Header(): JSX.Element {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-list-item">
            <Link className="header__logo" href="/">
              <h1 className="header__title">Nambururu</h1>
            </Link>
          </li>
          <li className="header__nav-list-item">
            <Link
              activeClassName="is-active"
              className="header__nav-list-item-link"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className="header__nav-list-item">
            <Link
              activeClassName="is-active"
              className="header__nav-list-item-link"
              href="/discover/"
            >
              Discover
            </Link>
          </li>
          <li className="header__nav-list-item">
            <Link
              activeClassName="is-active"
              className="header__nav-list-item-link"
              href="/settings/"
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
