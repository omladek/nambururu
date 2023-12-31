import { JSX } from 'preact'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'preact/hooks'

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
    externalLink,
    hasComments,
    id,
    media,
    permalink,
    subreddit,
    title,
    upVotes,
  } = post

  const [isLoaded, setIsLoaded] = useState(mediaLoading === 'eager')
  const [showContent, setShowContent] = useState(mediaLoading === 'eager')
  const { entry, inView, ref } = useInView()

  useEffect(() => {
    if (inView) {
      setIsLoaded(true)
      setShowContent(true)
    }
  }, [inView, post])

  useEffect(() => {
    if (!inView && isLoaded) {
      setShowContent(false)
    }
  }, [inView, isLoaded])

  useEffect(() => {
    if (isLoaded && entry?.target) {
      const element = entry.target as HTMLDivElement
      const { offsetHeight } = element

      element.style.setProperty('--minHeight', `${Math.ceil(offsetHeight)}px`)
    }
  }, [isLoaded, entry])

  return (
    <article className={`post is-${mediaLoading}`} ref={ref}>
      {isLoaded && showContent && (
        <>
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

              <dd className="post__domain">
                {externalLink ? (
                  <a
                    href={externalLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {domain}
                  </a>
                ) : (
                  domain.replace(/^self./, '')
                )}
              </dd>

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
        </>
      )}
    </article>
  )
}

export default Post
