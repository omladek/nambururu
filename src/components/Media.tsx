import { JSX } from 'preact'
import { Thread } from '../types/reddit-api/ThreadsResult.type'

import Gallery from './Gallery'
import Thumbnail from './Thumbnail'
import VideoPlayer from './VideoPlayer'
import YoutTube from './YouTube'

interface Props {
  post: Thread
}

function Media({ post }: Props): JSX.Element | null {
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
  } = post.data

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

  if (hasSingleImage) {
    return (
      <Thumbnail
        height={thumbnail_height || 0}
        thumbnail={['i.redd.it'].includes(domain) ? url : thumbnail}
        width={thumbnail_width || 0}
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
    return <Gallery items={media_metadata} />
  }

  if (hasYoutubeIframe) {
    return <YoutTube media={media} />
  }

  if (['nsfw'].includes(thumbnail)) {
    return (
      <Thumbnail
        height={90}
        thumbnail="https://satyr.dev/160x90/?text=nsfw&type=webp"
        width={160}
      />
    )
  }

  if (!url.startsWith('https://www.reddit.com/') && url.startsWith('r/')) {
    return (
      <a
        className="post-link"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        🔗
        {url}
      </a>
    )
  }

  return null
}

export default Media
