import Storage from '../constants/storage'

export default function parseStorage(key: Storage): string[] {
  return (localStorage.getItem(key) || '')
    .split(',')
    .map((str) => str.toLowerCase())
    .filter(Boolean)
}
