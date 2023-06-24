import { Option, getOptions } from './getOptions'
import basicSubreddits from '../constants/basicSubreddits'
import parseStorage from './parseStorage'
import Storage from '../constants/storage'

const getInitialOptions = (): Option[] => {
  const userSubreddits = parseStorage(Storage.MY_MIX)
  const userSubredditsSelection = parseStorage(Storage.MY_SELECTION)

  return getOptions([
    ...userSubreddits,
    ...userSubredditsSelection,
    ...basicSubreddits,
  ])
}

export default getInitialOptions
