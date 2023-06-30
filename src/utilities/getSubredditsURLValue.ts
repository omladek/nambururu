import parseStorage from './parseStorage'

export default function getSubredditsURLValue(key: string): string {
  const values = parseStorage(key)

  if (!values.length) {
    return 'best'
  }

  return values.join('+')
}
