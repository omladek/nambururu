import subreddits from '../constants/subreddits'
import { DEFAULT_LIMIT } from '../app'

const mergeAndUnique = (arr: string[]): string[] => {
  const mergedOrdered = [...arr].sort((a, b) => a.localeCompare(b, 'en-US'))

  return [...new Set(mergedOrdered.map((subreddit) => subreddit.toLowerCase()))]
}

const getSubredditsSelector = (allSubreddits: string[]): string => {
  const list = mergeAndUnique([...allSubreddits, ...subreddits])

  return `
  <form id="filters-form" method="GET" action="">
    <fieldset class="fieldset">
      <label class="label" for="subreddit">subreddit:</label>
      <input list="subreddit-list" id="subreddit" name="subreddit" value="my-mix" placeholder="search subreddit" />
      <datalist id="subreddit-list">
        <option value="my-mix" selected>my-mix</option>
        ${list
          .map(
            (subreddit) => `<option value="${subreddit}">${subreddit}</option>`,
          )
          .join('')}
      </datalist>

      <label class="label" for="limit">limit:</label>
      <select id="limit" name="limit" class="select">
        ${[...Array(10).keys()]
          .map((_, index) => {
            const limit = (index + 1) * 10

            return `<option value="${limit}" ${
              limit === DEFAULT_LIMIT ? 'selected' : ''
            }>${limit}</option>`
          })
          .join('')}
      </select>
      <button type="submit" class="refresh" title="refresh" aria-label="Refresh">&#8635;</button>
    </fieldset>
  </form>
  `
}

export default getSubredditsSelector
