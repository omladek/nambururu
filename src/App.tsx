import { JSX } from 'preact'
import { Router, Route } from 'preact-router'
import { createHashHistory } from 'history'

import Home from './routes/Home'
import Settings from './routes/Settings'
import hashHistoryAdapter from './utilities/hashHistoryAdapter'
import Header from './components/Header/Header'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Router history={hashHistoryAdapter(createHashHistory())}>
        <Route component={Home} path="/:subreddit?" />
        <Route component={Settings} path="/settings/" />
      </Router>
    </>
  )
}

export default App
