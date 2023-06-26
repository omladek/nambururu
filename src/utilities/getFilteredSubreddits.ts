import { Subreddit } from '../types/reddit-api/SubredditsResult.type'
import Storage from '../constants/storage'
import parseStorage from './parseStorage'
import containsKeyword from './containsKeyword'

export default function getFilteredSubreddits(
  subreddits: Subreddit[],
): Subreddit[] {
  return subreddits.filter((subreddit) => {
    const { display_name, subscribers, title } = subreddit.data

    const subredditName = display_name.toLowerCase()

    const isSubbed = [
      ...parseStorage(Storage.MY_MIX),
      ...parseStorage(Storage.MY_SELECTION),
    ]
      .map((sub) => sub.toLowerCase())
      .includes(subredditName)

    const myBlockedSubreddits = parseStorage(Storage.MY_BLOCKED_SUBREDDITS)
    const myBlockedTitleKeywords = parseStorage(
      Storage.MY_BLOCKED_TITLE_KEYWORDS,
    )

    if (subscribers < 100_000) {
      return false
    }

    if (isSubbed) {
      return false
    }

    // blocked by user subreddit(s) preferences
    if (myBlockedSubreddits.includes(subredditName)) {
      return false
    }

    // blocked by user title keyword(s) preferences in subreddit name
    if (containsKeyword(myBlockedTitleKeywords, subredditName)) {
      return false
    }

    // blocked by user title keyword(s) preferences
    return !containsKeyword(myBlockedTitleKeywords, title.toLowerCase())
  })
}
