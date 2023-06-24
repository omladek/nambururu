import { useState } from 'preact/hooks'
import { JSX } from 'preact'

import Filters from './components/Filters'
import List from './components/List'
import Storage from './constants/storage'

function App(): JSX.Element {
  const [settings, setSettings] = useState<{ subreddit: string; sort: string }>(
    {
      subreddit: Storage.MY_MIX,
      sort: 'best',
    },
  )

  return (
    <>
      <header className="header">
        <h1 className="header__title">Nambururu</h1>
        <p>
          This term could be constructed from the Sumerian words <em>nambur</em>{' '}
          (to watch, observe) and <em>uru</em> (person). It could be understood
          as <em>the one who watches</em> or <em>the observer</em>.
        </p>
      </header>

      <main className="main">
        <List
          key={JSON.stringify(settings)}
          sort={settings.sort}
          subreddit={settings.subreddit}
        />
      </main>

      <Filters
        onSort={(sort) => {
          setSettings((prev) => ({ ...prev, sort }))
        }}
        onSubmit={(subreddit) => {
          setSettings((prev) => ({ ...prev, subreddit }))
        }}
      />
    </>
  )
}

export default App
