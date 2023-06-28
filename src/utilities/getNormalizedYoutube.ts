import {
  ChildData,
  NormalizedYoutube,
} from '../types/reddit-api/ThreadsResult.type'
import parseYouTubeVideoId from './parseYouTubeVideoId'

export default (post: ChildData): NormalizedYoutube | null => {
  const { media } = post

  const hasYoutubeIframe = media && media?.type === 'youtube.com'

  if (hasYoutubeIframe) {
    return {
      type: 'youtube',
      width: 16,
      height: 9,
      id: parseYouTubeVideoId(media.oembed.html),
      thumbnail: media.oembed.thumbnail_url,
    }
  }
  return null
}
