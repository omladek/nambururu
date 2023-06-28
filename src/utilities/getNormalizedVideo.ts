import {
  ChildData,
  NormalizedVideo,
} from '../types/reddit-api/ThreadsResult.type'

export default (post: ChildData): NormalizedVideo | null => {
  const { domain, thumbnail, thumbnail_height, thumbnail_width, url } = post

  const isNormalizedVideo =
    ['i.imgur.com'].includes(domain) && url.endsWith('.gifv')

  if (isNormalizedVideo) {
    return {
      type: 'normalizedVideo',
      hasAudio: false,
      height: thumbnail_height || 9,
      poster: thumbnail,
      url: url.replace('.gifv', '.mp4'),
      width: thumbnail_width || 16,
    }
  }

  return null
}
