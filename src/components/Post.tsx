import { useState } from 'preact/hooks'

import { JSX } from 'preact'
import { NormalizedPost } from '../types/reddit-api/ThreadsResult.type'
import Media from './Media'
import CommentsPreview from './CommentsPreview'
import RichText from './RichText'

interface Props {
  post: NormalizedPost
  mediaLoading: 'lazy' | 'eager'
}

function Post({ mediaLoading, post }: Props): JSX.Element {
  const [showComments, setShowComments] = useState<boolean>(false)

  const {
    commentsTotalFormatted,
    createdDate,
    description,
    domain,
    downVotes,
    hasComments,
    id,
    media,
    permalink,
    subreddit,
    title,
    upVotes,
  } = post

  return (
    <article className="post">
      <Media media={media} mediaLoading={mediaLoading} />

      <div className="post__info">
        <h2 className="post__title">
          <small className="post__subreddit">
            r/
            {subreddit}
          </small>

          <a
            className="post__link"
            href={permalink}
            rel="noopener noreferrer"
            target="_blank"
          >
            {title}
          </a>
        </h2>

        {description ? (
          <div className="post__description">
            <RichText html={description} />
          </div>
        ) : null}

        <dl className="post__data">
          <dt className="sr-only">date:</dt>

          <dd className="post__time">
            <time>{createdDate}</time>
          </dd>

          <dt className="sr-only">domain:</dt>

          <dd className="post__domain">{domain}</dd>

          <dt>💬</dt>

          <dd>{commentsTotalFormatted}</dd>

          <dt>⬆️</dt>

          <dd>{upVotes}</dd>

          <dt>⬇️</dt>

          <dd>{downVotes}</dd>
        </dl>

        {hasComments && (
          <div className="post__comments">
            {showComments ? (
              <CommentsPreview id={id} />
            ) : (
              <p>
                <button
                  className="post__comments-btn"
                  onClick={() => setShowComments(true)}
                  type="button"
                >
                  Load comments
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default Post
