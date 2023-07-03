import { JSX } from 'preact'

interface Props {
  width: number
  height: number
  id: string
  thumbnail: string
}

function YoutTube({ height, id, thumbnail, width }: Props): JSX.Element | null {
  return (
    <a
      className="youtube"
      href={`https://www.youtube.com/watch?v=${id}`}
      rel="noopener noreferrer"
      style={{
        '--ar-width': width,
        '--ar-height': height,
      }}
      target="_blank"
    >
      <img
        alt=""
        className="youtube__logo"
        decoding="async"
        height="60"
        srcSet="https://satyr.dev/80x60/FF0000?brand=youtube 1x, https://satyr.dev/160x120/FF0000?brand=youtube 2x"
        width="80"
      />
      <img
        alt=""
        className="youtube__thumbnail"
        decoding="async"
        height={height}
        loading="lazy"
        src={thumbnail}
        width={width}
      />
    </a>
  )
}

export default YoutTube
