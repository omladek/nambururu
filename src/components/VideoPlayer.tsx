import { useEffect } from 'react'
import setupVideoPlayer from '../utilities/setupVideoPlayer'

interface Props {
  url: string
  height: number
  width: number
  hasAudio: boolean
  poster: string
}

function VideoPlayer({
  hasAudio,
  height,
  poster,
  url,
  width,
}: Props): JSX.Element {
  const audioUrl = url.replace(/_\d+/, '_audio')

  useEffect(() => {
    setupVideoPlayer()
  }, [])

  return (
    <div className="js-player">
      <video
        className="thumbnail thumbnail--video js-video"
        controls
        height={height}
        muted
        playsInline
        poster={poster}
        style={
          {
            '--ar-width': width,
            '--ar-height': height,
          } as React.CSSProperties
        }
        width={width}
      >
        <source className="js-source" data-src={url} type="video/mp4" />
      </video>

      {hasAudio ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio
          className="js-audio"
          controls
          hidden
          preload="none"
          src={audioUrl}
        />
      ) : null}
    </div>
  )
}

export default VideoPlayer
