import { Thread } from '../types/reddit-api/ThreadsResult.type'
import getYoutubeIframe from '../utilities/getYoutubeIframe'
import getThumbnailDimensions from '../utilities/getThumbnailDimensions'
import Gallery from './Gallery'
import Thumbnail from './Thumbnail'
import VideoPlayer from './VideoPlayer'

interface Props {
  post: Thread
  width: number
}

function Media({ post, width }: Props): JSX.Element | null {
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

  const hasRedditThumbnail = Boolean(
    url.startsWith('https://i.redd.it/') && preview && 'images' in preview,
  )

  const { thumbnailHeight, thumbnailWidth } = getThumbnailDimensions({
    hasRedditThumbnail,
    preview,
    thumbnail_height: thumbnail_height || 0,
    thumbnail_width: thumbnail_width || 0,
  })

  const youtubeIframe = media ? getYoutubeIframe(media) : ''

  const hasSingleImage =
    hasThumbnail &&
    !is_video &&
    !is_gallery &&
    !youtubeIframe &&
    thumbnailHeight &&
    thumbnailWidth

  const hasEmbeddedVideo =
    is_video && media && media.reddit_video && !youtubeIframe

  const hasGallery = is_gallery && media_metadata

  if (hasSingleImage) {
    return (
      <Thumbnail
        height={thumbnailHeight}
        thumbnail={['i.redd.it'].includes(domain) ? url : thumbnail}
        width={thumbnailWidth}
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

  if (youtubeIframe) {
    return (
      // eslint-disable-next-line react/no-danger
      <div dangerouslySetInnerHTML={{ __html: youtubeIframe }} />
    )
  }

  if (hasGallery) {
    return <Gallery containerWidth={width} items={media_metadata} />
  }

  return <p>no media</p>
}

export default Media
