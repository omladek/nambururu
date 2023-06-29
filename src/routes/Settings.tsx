import { JSX } from 'preact'

import Editor from '../components/Editor'

function Settings(): JSX.Element {
  return (
    <main className="main">
      <h1 className="title">Settings</h1>
      <Editor />
    </main>
  )
}

export default Settings
