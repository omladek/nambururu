import { JSX } from 'preact'

import { NormalizedPostMedia } from '../types/reddit-api/ThreadsResult.type'
import Gallery from './Gallery'
import Thumbnail from './Thumbnail'
import VideoPlayer from './VideoPlayer'
import YoutTube from './YouTube'

interface Props {
  media: NormalizedPostMedia
  mediaLoading: 'lazy' | 'eager'
}

function Media({ media, mediaLoading }: Props): JSX.Element | null {
  if (!media?.type) {
    return null
  }

  switch (media.type) {
    case 'normalizedVideo': {
      return (
        <VideoPlayer
          hasAudio={media.hasAudio}
          height={media.height}
          poster={media.poster}
          posterLoading={mediaLoading}
          url={media.url}
          width={media.width}
        />
      )
    }

    case 'singleImage': {
      return (
        <Thumbnail
          fullSize={media.fullSize || undefined}
          height={media.height}
          loading={mediaLoading}
          retina={media.retina}
          thumbnail={media.thumbnail}
          width={media.width}
        />
      )
    }

    case 'gallery': {
      return <Gallery items={media.items} mediaLoading={mediaLoading} />
    }

    case 'youtube': {
      return (
        <YoutTube
          height={media.height}
          id={media.id}
          posterLoading={mediaLoading}
          thumbnail={media.thumbnail}
          width={media.width}
        />
      )
    }

    case 'externalLink': {
      return (
        <a
          className="post-link"
          href={media.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt=""
            className="post-link__logo"
            decoding="async"
            height="50"
            loading={mediaLoading}
            src={media.image}
            width="50"
          />
        </a>
      )
    }

    case 'thumbnail':
    case 'previewImage': {
      return (
        <Thumbnail
          height={media.height}
          loading={mediaLoading}
          thumbnail={media.url}
          width={media.width}
        />
      )
    }

    default: {
      return null
    }
  }
}

export default Media
