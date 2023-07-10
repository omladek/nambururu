import { JSX } from 'preact'

import getSubredditsFromUserLists from '../../../utilities/getSubredditsFromUserLists'
import parseSubredditFromURL from '../../../utilities/parseSubredditFromURL'
import parseStorage from '../../../utilities/parseStorage'
import basicSubreddits from '../../../constants/basicSubreddits'

interface Props {
  onChange: JSX.GenericEventHandler<HTMLSelectElement>
}

function Nav({ onChange }: Props): JSX.Element {
  const defaultSubreddit =
    parseSubredditFromURL(window.location.href) || basicSubreddits[0]
  const userLists = parseStorage('lists') || []
  const subreddits = getSubredditsFromUserLists(userLists)

  return (
    <form action="" method="GET">
      <fieldset>
        <label htmlFor="subreddit-select">r/</label>
        <select
          defaultValue={defaultSubreddit}
          id="subreddit-select"
          name="subreddit-select"
          onChange={onChange}
        >
          <option disabled>choose</option>
          {!!userLists.length && (
            <optgroup label="my lists">
              {userLists.map((userList) => (
                <option key={userList} value={userList}>
                  {userList}
                </option>
              ))}
            </optgroup>
          )}

          <optgroup label="subreddits">
            {subreddits.map((subreddit) => (
              <option key={subreddit} value={subreddit}>
                {subreddit}
              </option>
            ))}
          </optgroup>
        </select>
      </fieldset>
    </form>
  )
}

export default Nav
