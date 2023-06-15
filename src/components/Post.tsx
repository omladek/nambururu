import { useElementSize } from 'usehooks-ts'
import { lazy, Suspense } from 'react'

import { Thread } from '../types/reddit-api/ThreadsResult.type'
import getDateFromUnixTime from '../utilities/getDateFromUnixTime'
import getYoutubeIframe from '../utilities/getYoutubeIframe'
import deescapeHtml from '../utilities/deescapeHtml'

const Gallery = lazy(() => import('./Gallery'))
const Thumbnail = lazy(() => import('./Thumbnail'))
const VideoPlayer = lazy(() => import('./VideoPlayer'))

const Post = ({ data }: Thread): JSX.Element => {
  const [squareRef, { width }] = useElementSize()

  const {
    thumbnail,
    subreddit,
    thumbnail_height,
    thumbnail_width,
    title,
    created_utc,
    selftext,
    selftext_html,
    is_video,
    media,
    permalink,
    domain,
    url,
    preview,
    is_gallery,
    media_metadata,
  } = data

  const hasThumbnail = !(
    thumbnail !== null &&
    ['nsfw', 'spoiler', 'default', 'self', 'image'].includes(thumbnail)
  )

  const hasRedditThumbnail =
    url.startsWith('https://i.redd.it/') && preview && 'images' in preview

  const thumbnailHeight = hasRedditThumbnail
    ? preview.images[0].source.height
    : thumbnail_height
  const thumbnailWidth = hasRedditThumbnail
    ? preview.images[0].source.width
    : thumbnail_width

  const youtubeIframe = media ? getYoutubeIframe(media) : ''

  const hasSingleImage =
    hasThumbnail && !is_video && !is_gallery && !youtubeIframe

  const enableHTML = true
  const description = enableHTML ? deescapeHtml(selftext_html || '') : selftext

  const hasEmbeddedVideo =
    is_video && media && media.reddit_video && !youtubeIframe

  const hasGallery = is_gallery && media_metadata

  return (
    <article className="post" ref={squareRef}>
      {hasSingleImage && (
        <Suspense>
          <Thumbnail
            height={thumbnailHeight || 0}
            width={thumbnailWidth || 0}
            thumbnail={['i.redd.it'].includes(domain) ? url : thumbnail}
          />
        </Suspense>
      )}
      {hasEmbeddedVideo && (
        <Suspense>
          <VideoPlayer
            {...{
              hasAudio: media.reddit_video.has_audio,
              height: media.reddit_video.height,
              poster: thumbnail,
              url: media.reddit_video.fallback_url,
              width: media.reddit_video.width,
            }}
          />
        </Suspense>
      )}
      {youtubeIframe && (
        <div dangerouslySetInnerHTML={{ __html: youtubeIframe }} />
      )}
      {hasGallery && (
        <Suspense>
          <Gallery containerWidth={width} items={media_metadata} />
        </Suspense>
      )}
      <div className="post__info">
        <h2 className="post__title">
          <a
            className="post__link"
            href={`https://www.reddit.com${permalink}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {title}
          </a>
        </h2>
        {description && (
          <div
            className="post__description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        <strong className="post__subreddit">{subreddit}</strong>,{' '}
        <time className="post__time">{getDateFromUnixTime(created_utc)}</time>,{' '}
        <span className="post__domain">{domain}</span>
      </div>
    </article>
  )
}

export default Post
