import { useState } from 'preact/hooks'

import { JSX } from 'preact'
import { Thread } from '../types/reddit-api/ThreadsResult.type'
import getDateFromUnixTime from '../utilities/getDateFromUnixTime'
import deescapeHtml from '../utilities/deescapeHtml'
import Media from './Media'
import CommentsPreview from './CommentsPreview'
import calculateDownvotes from '../utilities/calculateDownvotes'
import formatNumber from './formatNumber'

interface Props {
  post: Thread
}

function Post({ post }: Props): JSX.Element {
  const [showComments, setShowComments] = useState<boolean>(false)

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
  } = post.data

  return (
    <article className="post">
      <Media post={post} />

      <div className="post__info">
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
          <div className="post__description">{deescapeHtml(selftext_html)}</div>
        ) : null}

        <dl className="post__data">
          <dt>📆</dt>

          <dd>
            <time className="post__time">
              {getDateFromUnixTime(created_utc)}
            </time>
          </dd>

          <dt>🌐</dt>

          <dd>{domain.startsWith('self.') ? 'self' : domain}</dd>

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
              <button onClick={() => setShowComments(true)} type="button">
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
