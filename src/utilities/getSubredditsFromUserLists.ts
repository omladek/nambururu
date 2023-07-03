import getSortedList from './getSortedList'
import basicSubreddits from '../constants/basicSubreddits'
import parseStorage from './parseStorage'

const getSubredditsFromUserLists = (userLists: string[]): string[] => {
  let options = [...basicSubreddits]

  userLists.forEach((list) => {
    const value = parseStorage(list)

    options = [...options, ...value]
  })

  return getSortedList([...options])
}

export default getSubredditsFromUserLists
