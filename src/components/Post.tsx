import { useElementSize } from 'usehooks-ts'

import { Thread } from '../types/reddit-api/ThreadsResult.type'
import getDateFromUnixTime from '../utilities/getDateFromUnixTime'
import deescapeHtml from '../utilities/deescapeHtml'
import Media from './Media'

interface Props {
  post: Thread
}

function Post({ post }: Props): JSX.Element {
  const [squareRef, { width }] = useElementSize()

  const { created_utc, domain, permalink, selftext_html, subreddit, title } =
    post.data

  const description = deescapeHtml(selftext_html || '')

  return (
    <article className="post" ref={squareRef}>
      <Media post={post} width={width} />

      <div className="post__info">
        <h2 className="post__title">
          <a
            className="post__link"
            href={`https://www.reddit.com${permalink}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            {title}
          </a>
        </h2>

        {description ? (
          <div
            className="post__description"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : null}

        <strong className="post__subreddit">{subreddit}</strong>

        {', '}

        <time className="post__time">{getDateFromUnixTime(created_utc)}</time>

        {', '}

        <span className="post__domain">{domain}</span>
      </div>
    </article>
  )
}

export default Post
