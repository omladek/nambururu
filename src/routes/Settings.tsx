import { JSX } from 'preact'

import Link from '../components/Link'

function Settings(): JSX.Element {
  return (
    <main className="main">
      <h1 className="title">Settings</h1>
      <div className="block">
        <ul>
          <li>
            <Link href="/nambururu/#/lists/">My lists</Link>
          </li>
          <li>
            <Link href="/nambururu/#/blocked-subreddits/">
              Blocked subreddits
            </Link>
          </li>
          <li>
            <Link href="/nambururu/#/blocked-title-keywords/">
              Blocked title keywords
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}

export default Settings
