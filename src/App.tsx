/* eslint-disable react/no-unstable-nested-components */
import { JSX, createContext } from 'preact'
import { Router, Route } from 'preact-router'
import { createHashHistory } from 'history'
import AsyncRoute from 'preact-async-route'
import { useState } from 'preact/hooks'

import Home from './routes/Home'
import hashHistoryAdapter from './utilities/hashHistoryAdapter'
import Header from './components/Header/Header'
import Loader from './components/Loader'

export const NavigationContext = createContext(window.location.href)

function App(): JSX.Element {
  const [currentUrl, setCurrentUrl] = useState(window.location.href)

  const handleRouteChange = ({ url }: { url: string }): void => {
    setCurrentUrl(url)

    const scrollableContainer = document.querySelector<HTMLDivElement>('.main')

    if (scrollableContainer) {
      scrollableContainer.scrollTop = 0
    }
  }

  return (
    <NavigationContext.Provider value={currentUrl}>
      <Header />
      <Router
        history={hashHistoryAdapter(createHashHistory())}
        onChange={handleRouteChange}
      >
        <Route component={Home} default path="/:subreddit?" />
        <AsyncRoute
          getComponent={() =>
            import('./routes/Settings').then((module) => module.default)
          }
          loading={() => <Loader isFullScreen />}
          path="/settings/"
        />
        <AsyncRoute
          getComponent={() =>
            import('./routes/Lists/Lists').then((module) => module.default)
          }
          loading={() => <Loader isFullScreen />}
          path="/lists/"
        />
        <AsyncRoute
          getComponent={() =>
            import('./routes/EditBlockedSubreddits').then(
              (module) => module.default,
            )
          }
          loading={() => <Loader isFullScreen />}
          path="/blocked-subreddits/"
        />
        <AsyncRoute
          getComponent={() =>
            import('./routes/EditBlockedTitleKeywords').then(
              (module) => module.default,
            )
          }
          loading={() => <Loader isFullScreen />}
          path="/blocked-title-keywords/"
        />
        <AsyncRoute
          getComponent={() =>
            import('./routes/EditList').then((module) => module.default)
          }
          loading={() => <Loader isFullScreen />}
          path="/edit/:list?"
        />
      </Router>
    </NavigationContext.Provider>
  )
}

export default App
