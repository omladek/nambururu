import {
  ChildData,
  NormalizedThumbnail,
} from '../types/reddit-api/ThreadsResult.type'

export default (post: ChildData): NormalizedThumbnail | null => {
  const { domain, thumbnail, thumbnail_height, thumbnail_width, url } = post

  if (['image'].includes(thumbnail) && ['i.redd.it'].includes(domain)) {
    return {
      type: 'thumbnail',
      height: thumbnail_height || 90,
      width: thumbnail_width || 160,
      url,
    }
  }
  return null
}
