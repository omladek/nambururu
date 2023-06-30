import { JSX } from 'preact'
import { Router, Route } from 'preact-router'
import { createHashHistory } from 'history'

import Home from './routes/Home'
import Settings from './routes/Settings'
import hashHistoryAdapter from './utilities/hashHistoryAdapter'
import Header from './components/Header/Header'
import EditList from './components/Editor/components/EdditList/EditList'
import EditBlockedSubreddits from './components/Editor/components/EditBlockedSubreddits/EditBlockedSubreddits'
import EditBlockedTitleKeywords from './components/Editor/components/EditBlockedTitleKeywords/EditBlockedTitleKeywords'
import Lists from './components/Editor/components/Lists/Lists'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Router history={hashHistoryAdapter(createHashHistory())}>
        <Route component={Home} default path="/:subreddit?" />
        <Route component={Settings} path="/settings/" />
        <Route component={Lists} path="/lists/" />
        <Route component={EditBlockedSubreddits} path="/blocked-subreddits/" />
        <Route
          component={EditBlockedTitleKeywords}
          path="/blocked-title-keywords/"
        />
        <Route component={EditList} path="/edit/:list?" />
      </Router>
    </>
  )
}

export default App
