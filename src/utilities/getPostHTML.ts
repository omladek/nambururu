import getThumbnailHTML from './getThumbnailHTML'
import getDateFromUnixTime from './getDateFromUnixTime'
import getVideoPlayerHTML from './getVideoPlayerHTML'
import deescapeHtml from './deescapeHtml'
import getGalleryHTML from './getGalleryHTML'
import { Thread } from '../types/reddit-api/ThreadsResult.type'
import getYoutubeIframe from './getYoutubeIframe'

const getPostHTML = (
  postData: Thread,
  postIndex: number,
  postSizer: HTMLDivElement,
): string => {
  const {
    thumbnail,
    subreddit,
    thumbnail_height,
    thumbnail_width,
    title,
    created_utc,
    selftext,
    selftext_html,
    is_video,
    media,
    permalink,
    domain,
    url,
    preview,
    is_gallery,
    media_metadata,
  } = postData.data

  const hasThumbnail = !(
    thumbnail !== null &&
    ['nsfw', 'spoiler', 'default', 'self', 'image'].includes(thumbnail)
  )

  const hasRedditThumbnail =
    url.startsWith('https://i.redd.it/') && preview && 'images' in preview

  const thumbnailHeight = hasRedditThumbnail
    ? preview.images[0].source.height
    : thumbnail_height
  const thumbnailWidth = hasRedditThumbnail
    ? preview.images[0].source.width
    : thumbnail_width

  const enableHTML = true
  const description = enableHTML ? deescapeHtml(selftext_html || '') : selftext

  const youtubeIframe = media ? getYoutubeIframe(media) : ''

  return `
        <article class="post">
            ${
              hasThumbnail && !is_video && !is_gallery && !youtubeIframe
                ? getThumbnailHTML({
                    thumbnail: url.startsWith('https://i.redd.it/')
                      ? url
                      : thumbnail,
                    height: thumbnailHeight || 0,
                    width: thumbnailWidth || 0,
                    loading: postIndex <= 2 ? 'eager' : 'lazy',
                  })
                : ''
            }
            ${
              is_video && media && media.reddit_video && !youtubeIframe
                ? getVideoPlayerHTML({
                    hasAudio: media.reddit_video.has_audio,
                    height: media.reddit_video.height,
                    poster: thumbnail,
                    url: media.reddit_video.fallback_url,
                    width: media.reddit_video.width,
                  })
                : ''
            }
            ${youtubeIframe}
            ${is_gallery ? getGalleryHTML(media_metadata, postSizer) : ''}
          <div class="post__info">
            <h2 class="post__title"><a class="post__link" href="https://www.reddit.com${permalink}" target="_blank">${title}</a></h2>
            ${
              description
                ? `<div class="post__description">${description}</div>`
                : ''
            }
            <small class="post__subreddit">${subreddit}</small>,
            <time class="post__time">${getDateFromUnixTime(created_utc)}</time>,
            <span class="post__domain">${domain}</span>
          </div>
        </article>
    `
}

export default getPostHTML
