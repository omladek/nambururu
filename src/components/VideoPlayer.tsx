import { useEffect } from 'react'
import setupVideoPlayer from '../utilities/setupVideoPlayer'

interface Props {
  url: string
  height: number
  width: number
  hasAudio: boolean
  poster: string
}

const VideoPlayer = ({
  url,
  height,
  width,
  hasAudio,
  poster,
}: Props): JSX.Element => {
  const audioUrl = url.replace(/_\d+/, '_audio')

  useEffect(() => {
    setupVideoPlayer()
  }, [])

  return (
    <div className="js-player">
      <video
        className="thumbnail thumbnail--video js-video"
        controls
        poster={poster}
        width={width}
        height={height}
        playsInline
        muted
        style={
          {
            '--ar-width': width,
            '--ar-height': height,
          } as React.CSSProperties
        }
      >
        <source className="js-source" data-src={url} type="video/mp4" />
      </video>
      {hasAudio && (
        <audio
          controls
          src={audioUrl}
          className="js-audio"
          hidden
          preload="none"
        />
      )}
    </div>
  )
}

export default VideoPlayer
