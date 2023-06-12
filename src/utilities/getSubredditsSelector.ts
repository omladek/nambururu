import subreddits from '../constants/subreddits'
import { DEFAULT_LIMIT } from '../app'

/**
 * @returns {String}
 */
const getSubredditsSelector = () => `
  <form id="filters-form" method="GET" action="">
    <fieldset class="fieldset">
      <label for="subreddit">subreddit:</label>
      <select id="subreddit" name="subreddit" class="select">
      <option value="${subreddits.join('+')}" selected>------mix------</option>
        ${subreddits
          .map(
            (subreddit) => `<option value="${subreddit}">${subreddit}</option>`,
          )
          .join('')}
      </select>
      <label for="limit">limit:</label>
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

export default getSubredditsSelector
