import { useElementSize } from 'usehooks-ts'
import { lazy, Suspense } from 'react'

import { Preview, Thread } from '../types/reddit-api/ThreadsResult.type'
import getDateFromUnixTime from '../utilities/getDateFromUnixTime'
import getYoutubeIframe from '../utilities/getYoutubeIframe'
import deescapeHtml from '../utilities/deescapeHtml'

const Gallery = lazy(() => import('./Gallery'))
const Thumbnail = lazy(() => import('./Thumbnail'))
const VideoPlayer = lazy(() => import('./VideoPlayer'))

function getThumbnailDimensions(
  hasRedditThumbnail: boolean,
  preview: Preview | undefined,
  thumbnail_height: number,
  thumbnail_width: number,
): { thumbnailHeight: number; thumbnailWidth: number } {
  const thumbnailHeight = hasRedditThumbnail
    ? preview?.images[0].source.height || 0
    : thumbnail_height
  const thumbnailWidth = hasRedditThumbnail
    ? preview?.images[0].source.width || 0
    : thumbnail_width

  return { thumbnailHeight, thumbnailWidth }
}

interface Props {
  post: Thread
}

function Post({ post }: Props): JSX.Element {
  const [squareRef, { width }] = useElementSize()

  const {
    created_utc,
    domain,
    is_gallery,
    is_video,
    media,
    media_metadata,
    permalink,
    preview,
    selftext_html,
    subreddit,
    thumbnail,
    thumbnail_height,
    thumbnail_width,
    title,
    url,
  } = post.data

  const hasThumbnail = !(
    thumbnail !== null &&
    ['nsfw', 'spoiler', 'default', 'self', 'image'].includes(thumbnail)
  )

  const hasRedditThumbnail = Boolean(
    url.startsWith('https://i.redd.it/') && preview && 'images' in preview,
  )

  const { thumbnailHeight, thumbnailWidth } = getThumbnailDimensions(
    hasRedditThumbnail,
    preview,
    thumbnail_height || 0,
    thumbnail_width || 0,
  )

  const youtubeIframe = media ? getYoutubeIframe(media) : ''

  const hasSingleImage =
    hasThumbnail && !is_video && !is_gallery && !youtubeIframe

  const description = deescapeHtml(selftext_html || '')

  const hasEmbeddedVideo =
    is_video && media && media.reddit_video && !youtubeIframe

  const hasGallery = is_gallery && media_metadata

  const renderThumbnail = hasSingleImage && (
    <Suspense>
      <Thumbnail
        height={thumbnailHeight}
        thumbnail={['i.redd.it'].includes(domain) ? url : thumbnail}
        width={thumbnailWidth}
      />
    </Suspense>
  )

  const renderEmbeddedVideo = hasEmbeddedVideo && (
    <Suspense>
      <VideoPlayer
        hasAudio={media.reddit_video.has_audio}
        height={media.reddit_video.height}
        poster={thumbnail}
        url={media.reddit_video.fallback_url}
        width={media.reddit_video.width}
      />
    </Suspense>
  )

  const renderYoutubeIframe = youtubeIframe && (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: youtubeIframe }} />
  )

  const renderGallery = hasGallery && (
    <Suspense>
      <Gallery containerWidth={width} items={media_metadata} />
    </Suspense>
  )

  return (
    <article className="post" ref={squareRef}>
      {renderThumbnail}

      {renderEmbeddedVideo}

      {renderYoutubeIframe}

      {renderGallery}

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
