import { JSX } from 'preact'
import { Router, Route } from 'preact-router'
import { createHashHistory } from 'history'

import Home from './components/Home'
import Editor from './components/Editor'
import Subreddits from './components/Subreddits/Subreddits'
import hashHistoryAdapter from './utilities/hashHistoryAdapter'
import Header from './components/Header/Header'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Router history={hashHistoryAdapter(createHashHistory())}>
        <Route component={Home} path="/:subreddit?" />
        <Route component={Subreddits} path="/discover/" />
        <Route component={Editor} path="/settings/" />
      </Router>
    </>
  )
}

export default App
