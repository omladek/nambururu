import {
  ChildData,
  NormalizedPostMedia,
} from '../types/reddit-api/ThreadsResult.type'
import getNormalizedEmbeddedVideo from './getNormalizedEmbeddedVideo'
import getNormalizedExternalLink from './getNormalizedExternalLink'
import getNormalizedGallery from './getNormalizedGallery'
import getNormalizedSingleImage from './getNormalizedSingleImage'
import getNormalizedThumbnail from './getNormalizedThumbnail'
import getNormalizedVideo from './getNormalizedVideo'
import getNormalizedYoutube from './getNormalizedYoutube'

export default function getPostMedia(post: ChildData): NormalizedPostMedia {
  const normalizedVideo = getNormalizedVideo(post)

  if (normalizedVideo) {
    return normalizedVideo
  }

  const normalizedSingleImage = getNormalizedSingleImage(post)

  if (normalizedSingleImage) {
    return normalizedSingleImage
  }

  const normalizedEmbeddedVideo = getNormalizedEmbeddedVideo(post)

  if (normalizedEmbeddedVideo) {
    return normalizedEmbeddedVideo
  }

  const normalizedGallery = getNormalizedGallery(post)

  if (normalizedGallery) {
    return normalizedGallery
  }

  const normalizedYoutube = getNormalizedYoutube(post)

  if (normalizedYoutube) {
    return normalizedYoutube
  }

  const normalizedExternalLink = getNormalizedExternalLink(post)

  if (normalizedExternalLink) {
    return normalizedExternalLink
  }

  const normalizedThumbnail = getNormalizedThumbnail(post)

  if (normalizedThumbnail) {
    return normalizedThumbnail
  }

  return null
}
