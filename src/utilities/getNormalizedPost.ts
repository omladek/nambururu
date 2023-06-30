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
    crosspost_parent,
    crosspost_parent_list,
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

  const crossPost =
    crosspost_parent && !!crosspost_parent_list?.length
      ? crosspost_parent_list.find((item) => item.name === crosspost_parent)
      : null

  if (crossPost) {
    return getNormalizedPost(crossPost)
  }

  const media = getPostMedia(post)

  return {
    uniqueId: crypto.randomUUID(),
    createdDate: getDateFromUnixTime(created_utc),
    domain,
    id,
    commentsTotalFormatted: formatNumber(num_comments),
    hasComments: num_comments > 0,
    permalink: `https://www.reddit.com${permalink}`,
    description: updateAnchorTags(deescapeHtml(selftext_html || '')),
    subreddit,
    title,
    upVotes: formatNumber(ups),
    downVotes: formatNumber(calculateDownvotes(ups, upvote_ratio)),
    media,
  }
}

export default getNormalizedPost
