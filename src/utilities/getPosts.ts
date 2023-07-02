import parseStorage from './parseStorage'
import Storage from '../constants/storage'
import isBlockedPost from './isBlockedPost'
import getNormalizedPost from './getNormalizedPost'
import getCrossPost from './getCrossPost'
import { NormalizedPost, Thread } from '../types/reddit-api/ThreadsResult.type'

const getPosts = (posts: Thread[]): NormalizedPost[] => {
  const myBlockedSubreddits = parseStorage(Storage.BLOCKED_SUBREDDITS)
  const myBlockedTitleKeywords = parseStorage(Storage.BLOCKED_TITLE_KEYWORDS)

  return posts.reduce((acc: NormalizedPost[], post: Thread) => {
    const postData = getCrossPost(post.data)

    if (isBlockedPost(postData, myBlockedSubreddits, myBlockedTitleKeywords)) {
      return acc
    }

    return [...acc, getNormalizedPost(postData)]
  }, [])
}

export default getPosts
