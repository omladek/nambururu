import { useState } from 'preact/hooks'

import { JSX } from 'preact'
import { NormalizedPost } from '../../types/reddit-api/ThreadsResult.type'
import Media from '../Media'
import CommentsPreview from '../CommentsPreview'
import RichText from '../RichText'

import './Post.css'
import Link from '../Link'
import isInStorage from '../../utilities/isInStorage'
import parseStorage from '../../utilities/parseStorage'

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

  const userLists = parseStorage('lists').filter((list) =>
    isInStorage(list, subreddit),
  )

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

          {!!userLists.length && (
            <>
              <dt>
                <span className="sr-only">in my lists:</span>
                <span aria-hidden>📚</span>
              </dt>
              <dd>
                {userLists.map((list) => (
                  <Link
                    className="post__subreddit-link"
                    href={`/nambururu/#/?subreddit=${list}&sort=best`}
                    key={list}
                  >
                    {list}
                  </Link>
                ))}
              </dd>
            </>
          )}

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
            {showComments ? (
              <CommentsPreview id={id} />
            ) : (
              <p>
                <button
                  className="btn btn--block"
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
