import {
  ChildData,
  NormalizedPost,
} from '../types/reddit-api/ThreadsResult.type'
import calculateDownvotes from './calculateDownvotes'
import deescapeHtml from './deescapeHtml'
import formatNumber from './formatNumber'
import getDateFromUnixTime from './getDateFromUnixTime'
import getPostMedia from './getPostMedia'
import updateAnchorTags from './updateAnchorTags'

const getNormalizedPost = (post: ChildData): NormalizedPost => {
  const {
    created_utc,
    domain,
    id,
    num_comments,
    permalink,
    selftext_html,
    subreddit,
    title,
    ups,
    upvote_ratio,
  } = post

  const media = getPostMedia(post)

  return {
    uniqueId:
      window.location.protocol === 'http:'
        ? `${id}-${Math.random()}`
        : crypto.randomUUID(),
    createdDate: getDateFromUnixTime(created_utc),
    domain,
    id,
    commentsTotalFormatted: formatNumber(num_comments),
    hasComments: num_comments > 0,
    permalink: `https://www.reddit.com${permalink}`,
    description: updateAnchorTags(deescapeHtml(selftext_html || '')),
    subreddit,
    title: deescapeHtml(title),
    upVotes: formatNumber(ups),
    downVotes: formatNumber(calculateDownvotes(ups, upvote_ratio)),
    media,
  }
}

export default getNormalizedPost
