import { Media } from '../types/reddit-api/ThreadsResult.type'
import deescapeHtml from './deescapeHtml'

const getYoutubeIframe = (media: Media): string => {
  if (media.type !== 'youtube.com') {
    return ''
  }

  const { html, width, height } = media.oembed

  return deescapeHtml(
    html.replace(
      'iframe ',
      `iframe loading="lazy" class="thumbnail" style="--ar-width: ${width};--ar-height: ${height};" `,
    ),
  )
}

export default getYoutubeIframe
