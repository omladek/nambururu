import getUniqueStrings from './getUniqueStrings'

export interface Option {
  value: string
  lowerCase: string
}
export const getOptions = (arr: string[]): Option[] =>
  getUniqueStrings(
    [...arr]
      .sort((a, b) => a.localeCompare(b, 'en-US'))
      .filter(Boolean)
      .filter((option) => option !== ''),
  ).map((option) => ({
    value: option,
    lowerCase: option.toLowerCase(),
  }))
