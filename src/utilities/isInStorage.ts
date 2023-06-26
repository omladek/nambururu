import Storage from '../constants/storage'
import parseStorage from './parseStorage'

export default function isInStorage(key: Storage, value: string): boolean {
  const currentValue = parseStorage(key)

  return Boolean(
    currentValue.find((item) => item.toLowerCase() === value.toLowerCase()),
  )
}
