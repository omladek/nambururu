import Storage from '../constants/storage'

export default function getDefaultValue(key: Storage): string {
  return localStorage.getItem(key) || ''
}
