import { Media } from '../types/reddit-api/ThreadsResult.type'
import parseYouTubeVideoId from '../utilities/parseYouTubeVideoId'

interface Props {
  media: Media
}

function YoutTube({ media }: Props): JSX.Element | null {
  const { html, thumbnail_url } = media.oembed
  const height = 9
  const width = 16

  const youtubeId = parseYouTubeVideoId(html)

  return (
    <a
      className="youtube"
      href={`https://www.youtube.com/watch?v=${youtubeId}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        alt=""
        className="youtube__logo"
        decoding="async"
        height="60"
        src="https://satyr.dev/80x60/red?brand=youtube"
        srcSet="https://satyr.dev/80x60/FF0000?brand=youtube 1x, https://satyr.dev/160x120/FF0000?brand=youtube 2x"
        width="80"
      />

      <img
        alt=""
        className="thumbnail"
        decoding="async"
        height={height}
        loading="lazy"
        src={thumbnail_url}
        style={
          {
            '--ar-width': width,
            '--ar-height': height,
            objectFit: 'cover',
          } as React.CSSProperties
        }
        width={width}
      />
    </a>
  )
}

export default YoutTube
