import { useState } from 'preact/hooks'
import { useElementSize } from 'usehooks-ts'

import { JSX } from 'preact'
import { Thread } from '../types/reddit-api/ThreadsResult.type'
import getDateFromUnixTime from '../utilities/getDateFromUnixTime'
import deescapeHtml from '../utilities/deescapeHtml'
import Media from './Media'
import CommentsPreview from './CommentsPreview'
import calculateDownvotes from '../utilities/calculateDownvotes'
import formatNumber from './formatNumber'
import RichText from './RichText'
import updateAnchorTags from '../utilities/updateAnchorTags'

interface Props {
  post: Thread
}

function Post({ post }: Props): JSX.Element {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [squareRef, { width: containerWidth }] = useElementSize()

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
  } = post.data

  const crossPostData =
    crosspost_parent && !!crosspost_parent_list?.length
      ? crosspost_parent_list.find((item) => item.name === crosspost_parent)
      : null

  const postData = crossPostData || post.data

  return (
    <article className="post">
      <Media containerWidth={containerWidth} postData={postData} />

      <div className="post__info" ref={squareRef}>
        <h2 className="post__title">
          <small className="post__subreddit">
            r/
            {subreddit}
          </small>

          <a
            className="post__link"
            href={`https://www.reddit.com${permalink}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {deescapeHtml(title)}
          </a>
        </h2>

        {selftext_html ? (
          <div className="post__description">
            <RichText html={updateAnchorTags(deescapeHtml(selftext_html))} />
          </div>
        ) : null}

        <dl className="post__data">
          <dt className="sr-only">date:</dt>

          <dd>
            <time className="post__time">
              {getDateFromUnixTime(created_utc)}
            </time>
          </dd>

          <dt>🌐</dt>

          <dd className="post__domain">{domain}</dd>

          <dt>💬</dt>

          <dd>{formatNumber(num_comments)}</dd>

          <dt>⬆️</dt>

          <dd>{formatNumber(ups)}</dd>

          <dt>⬇️</dt>

          <dd>{formatNumber(calculateDownvotes(ups, upvote_ratio))}</dd>
        </dl>

        {!!num_comments && (
          <div className="post__comments">
            {showComments ? (
              <CommentsPreview id={id} />
            ) : (
              <button
                className="post__comments-btn"
                onClick={() => setShowComments(true)}
                type="button"
              >
                Load comments
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default Post
