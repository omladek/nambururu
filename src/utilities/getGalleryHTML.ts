import { RedditMediaMetadata } from '../types/reddit-api/ThreadsResult.type'
import getThumbnailHTML from './getThumbnailHTML'

const getGalleryHTML = (galleryItems: RedditMediaMetadata | null): string => {
  if (!galleryItems) {
    return ''
  }

  const galleryKeys = Object.keys(galleryItems)

  const html = galleryKeys.reduce((acc, curr) => {
    const image = galleryItems[curr].s

    return (
      acc +
      getThumbnailHTML({
        thumbnail: image.u,
        height: image.y,
        width: image.x,
        loading: 'lazy',
      })
    )
  }, '')

  return html
}

export default getGalleryHTML
