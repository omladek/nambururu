/* eslint-disable sonarjs/cognitive-complexity */
import { JSX } from 'preact'

import { ChildData } from '../types/reddit-api/ThreadsResult.type'
import Gallery from './Gallery'
import Thumbnail from './Thumbnail'
import VideoPlayer from './VideoPlayer'
import YoutTube from './YouTube'
import getImageResolutionByContainerWidth from '../utilities/getImageResolutionByContainerWidth'

interface Props {
  postData: ChildData
  containerWidth: number
}

function Media({ containerWidth, postData }: Props): JSX.Element | null {
  const {
    domain,
    is_gallery,
    is_video,
    media,
    media_metadata,
    preview,
    thumbnail,
    thumbnail_height,
    thumbnail_width,
    url,
  } = postData

  const hasThumbnail = !(
    thumbnail !== null &&
    ['nsfw', 'spoiler', 'default', 'self', 'image'].includes(thumbnail)
  )

  const hasYoutubeIframe = media && media?.type === 'youtube.com'

  const hasSingleImage =
    hasThumbnail &&
    !is_video &&
    !is_gallery &&
    !hasYoutubeIframe &&
    !!preview?.images[0].source

  const hasEmbeddedVideo =
    is_video && media && media.reddit_video && !hasYoutubeIframe

  const hasGallery = is_gallery && media_metadata

  if (['i.imgur.com'].includes(domain) && url.endsWith('.gifv')) {
    return (
      <VideoPlayer
        hasAudio={false}
        height={thumbnail_height || 9}
        poster={thumbnail}
        url={url.replace('.gifv', '.mp4')}
        width={thumbnail_width || 16}
      />
    )
  }

  if (hasSingleImage) {
    return (
      <Thumbnail
        fullSize={preview?.images[0].source.url}
        height={Math.max(
          ...[thumbnail_height || 0, preview?.images[0].source.height || 0],
        )}
        thumbnail={
          getImageResolutionByContainerWidth(
            preview?.images[0].resolutions || [],
            containerWidth,
          )?.url || thumbnail
        }
        width={Math.max(
          ...[thumbnail_width || 0, preview?.images[0].source.width || 0],
        )}
      />
    )
  }

  if (hasEmbeddedVideo) {
    return (
      <VideoPlayer
        hasAudio={media.reddit_video.has_audio}
        height={media.reddit_video.height}
        poster={thumbnail}
        url={media.reddit_video.fallback_url}
        width={media.reddit_video.width}
      />
    )
  }

  if (hasGallery) {
    return <Gallery containerWidth={containerWidth} items={media_metadata} />
  }

  if (hasYoutubeIframe) {
    return <YoutTube media={media} />
  }

  if (
    !url.startsWith('https://www.reddit.com/') &&
    !url.startsWith('r/') &&
    !domain.includes('i.redd.it')
  ) {
    return (
      <a
        className="post-link"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          alt={`logo: ${domain}`}
          className="post-link__logo"
          decoding="async"
          loading="lazy"
          src={`https://logo.clearbit.com/${domain.replace(/^m./, '')}`}
        />
      </a>
    )
  }

  if (['image'].includes(thumbnail) && ['i.redd.it'].includes(domain)) {
    return (
      <Thumbnail
        height={thumbnail_height || 90}
        thumbnail={url}
        width={thumbnail_width || 160}
      />
    )
  }

  return null
}

export default Media
