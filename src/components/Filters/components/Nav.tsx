import { useState } from 'preact/hooks'
import { JSX } from 'preact'

import { Option } from '../../../utilities/getOptions'
import getInitialOptions from '../../../utilities/getInitialOptions'
import parseSubredditFromURL from '../../../utilities/parseSubredditFromURL'

interface Props {
  onChange: JSX.GenericEventHandler<HTMLSelectElement>
}

function Nav({ onChange }: Props): JSX.Element {
  const defaultSubreddit = parseSubredditFromURL(window.location.href) || 'best'
  const userLists =
    localStorage.getItem('lists')?.split(',').filter(Boolean) || []
  const [optionsCache] = useState<Option[]>(() => getInitialOptions())

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
            {optionsCache.map((option) => (
              <option key={option.lowerCase} value={option.value}>
                {option.value}
              </option>
            ))}
          </optgroup>
        </select>
      </fieldset>
    </form>
  )
}

export default Nav
