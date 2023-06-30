import { Option, getOptions } from './getOptions'
import basicSubreddits from '../constants/basicSubreddits'
import getListValue from './getListValue'
import parseStorage from './parseStorage'

const getInitialOptions = (): Option[] => {
  const userLists = parseStorage('lists')

  let options = [...basicSubreddits]

  userLists.forEach((list) => {
    const value = getListValue(list)

    options = [...options, ...value]
  })

  return getOptions([...options])
}

export default getInitialOptions
