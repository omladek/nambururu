import getListOfSubreddits from './getListOfSubreddits'

const mergeAndUnique = (arr: string[]): string[] => {
  const mergedOrdered = [...arr].sort((a, b) => a.localeCompare(b, 'en-US'))

  return [...new Set(mergedOrdered)]
}

const getFiltersHTML = async (): Promise<string> => {
  const allSubreddits = await getListOfSubreddits()
  const subreddits = (import.meta.env.VITE_SUBREDDITS || 'best').split(',')
  const list = mergeAndUnique([...allSubreddits, ...subreddits])

  return `
  <form id="filters-form" method="GET" action="">
    <fieldset class="fieldset">
      <label class="label" for="subreddit">subreddit:</label>
      <input list="subreddit-list" maxlength="38" id="subreddit" name="subreddit" value="my-mix" placeholder="search subreddit" />
      <datalist id="subreddit-list">
        <option value="my-mix" selected>my-mix</option>
        ${list
          .map((subreddit) => `<option value="${subreddit}"></option>`)
          .join('')}
      </datalist>
      <button type="submit" class="refresh" title="refresh" aria-label="Refresh">&#8635;</button>
    </fieldset>
  </form>
  `
}

export default getFiltersHTML
