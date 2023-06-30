import containsKeyword from './containsKeyword'
import { Thread } from '../types/reddit-api/ThreadsResult.type'
import parseStorage from './parseStorage'
import Storage from '../constants/storage'

export default function getFilteredPosts(posts: Thread[]): Thread[] {
  const myBlockedSubreddits = parseStorage(Storage.BLOCKED_SUBREDDITS)
  const myBlockedTitleKeywords = parseStorage(Storage.BLOCKED_TITLE_KEYWORDS)

  return posts.filter((post) => {
    // ignore moderator notices, etc.
    if (post.data.stickied) {
      return false
    }

    // must be logged-in to view nsfw
    if (['nsfw'].includes(post.data.thumbnail)) {
      return false
    }

    // blocked by user subreddit(s) preferences
    if (myBlockedSubreddits.includes(post.data.subreddit.toLowerCase())) {
      return false
    }

    // blocked by user title keyword(s) preferences
    return !containsKeyword(
      myBlockedTitleKeywords,
      post.data.title.toLowerCase(),
    )
  })
}
