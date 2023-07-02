import { JSX } from 'preact'
import { NormalizedPost } from '../../types/reddit-api/ThreadsResult.type'
import Media from '../Media'
import CommentsPreview from '../CommentsPreview'
import RichText from '../RichText'

import './Post.css'
import Link from '../Link'

interface Props {
  post: NormalizedPost
  mediaLoading: 'lazy' | 'eager'
}

function Post({ mediaLoading, post }: Props): JSX.Element {
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

          <dt className="sr-only">subreddit:</dt>

          <dd>
            <Link
              className="post__subreddit-link"
              href={`/nambururu/#/?subreddit=${subreddit}&sort=best`}
            >
              {`r/${subreddit}`}
            </Link>
          </dd>

          <dt>
            <span className="sr-only">domain:</span>
            <span aria-hidden>🌐</span>
          </dt>

          <dd className="post__domain">{domain.replace('self.', '')}</dd>

          <dt>
            <span aria-hidden>💬</span>
            <span className="sr-only">comments:</span>
          </dt>

          <dd>{commentsTotalFormatted}</dd>

          <dt>
            <span aria-hidden>⬆️</span>
            <span className="sr-only">upvotes:</span>
          </dt>

          <dd>{upVotes}</dd>

          <dt>
            <span aria-hidden>⬇️</span>
            <span className="sr-only">downvotes:</span>
          </dt>

          <dd>{downVotes}</dd>
        </dl>

        {hasComments && (
          <div className="post__comments">
            <CommentsPreview id={id} />
          </div>
        )}
      </div>
    </article>
  )
}

export default Post
