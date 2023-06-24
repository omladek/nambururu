import { Option, getOptions } from './getOptions'
import basicSubreddits from '../constants/basicSubreddits'

const getInitialOptions = (): Option[] => {
  const userSubreddits: string[] = (localStorage.getItem('myMix') || 'best')
    .split(',')
    .filter(Boolean)

  const userSubredditsSelection: string[] = (
    localStorage.getItem('mySelection') || ''
  )
    .split(',')
    .filter(Boolean)

  return getOptions([
    ...userSubreddits,
    ...userSubredditsSelection,
    ...basicSubreddits,
  ])
}

export default getInitialOptions
