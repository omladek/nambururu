import { JSX } from 'preact'

import Link from '../components/Link'
import parseStorage from '../utilities/parseStorage'
import Storage from '../constants/storage'

function Settings(): JSX.Element {
  return (
    <main className="main">
      <h1 className="title">Settings</h1>
      <div className="block">
        <ul>
          <li>
            <Link href="/nambururu/#/lists/">My lists</Link> (
            {parseStorage('lists').length})
          </li>
          <li>
            <Link href="/nambururu/#/blocked-subreddits/">
              Blocked subreddits
            </Link>{' '}
            ({parseStorage(Storage.BLOCKED_SUBREDDITS).length})
          </li>
          <li>
            <Link href="/nambururu/#/blocked-title-keywords/">
              Blocked title keywords
            </Link>{' '}
            ({parseStorage(Storage.BLOCKED_TITLE_KEYWORDS).length})
          </li>
        </ul>
      </div>
    </main>
  )
}

export default Settings
