import settings from '../constants/settings'
import {
  ChildData,
  NormalizedSingleImage,
} from '../types/reddit-api/ThreadsResult.type'
import getImageByContainerWidth from './getImageByContainerWidth'

export default (post: ChildData): NormalizedSingleImage | null => {
  const {
    is_gallery,
    is_video,
    media,
    preview,
    thumbnail,
    thumbnail_height,
    thumbnail_width,
  } = post

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

  if (hasSingleImage) {
    return {
      type: 'singleImage',
      fullSize: preview?.images[0].source.url,
      height: Math.max(
        ...[thumbnail_height || 0, preview?.images[0].source.height || 0],
      ),
      retina:
        getImageByContainerWidth(
          preview?.images[0].resolutions.map((image) => ({
            u: image.url,
            x: image.width,
            y: image.height,
          })) || [],
          settings.IMAGE_CONTAINER_WIDTH,
          2,
        )?.u || '',
      thumbnail:
        getImageByContainerWidth(
          preview?.images[0].resolutions.map((image) => ({
            u: image.url,
            x: image.width,
            y: image.height,
          })) || [],
          settings.IMAGE_CONTAINER_WIDTH,
          1,
        )?.u || thumbnail,
      width: Math.max(
        ...[thumbnail_width || 0, preview?.images[0].source.width || 0],
      ),
    }
  }
  return null
}
