import parseStorage from './parseStorage'

import Storage from '../constants/storage'

export default function getSubredditsURLValue(key: Storage): string {
  const values = parseStorage(key)

  if (!values.length) {
    return 'best'
  }

  return values.join('+')
}
