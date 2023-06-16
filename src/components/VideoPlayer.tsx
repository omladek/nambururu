import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import syncMediaPlayback from '../utilities/syncMediaPlayback'
import deescapeHtml from '../utilities/deescapeHtml'

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
  const { inView, ref } = useInView({ triggerOnce: true })
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showSrc, setShowSrc] = useState(false)
  const audioUrl = url.replace(/_\d+/, '_audio')

  const hasPoster = !(
    poster !== null &&
    ['nsfw', 'spoiler', 'default', 'self', 'image'].includes(poster)
  )

  useEffect(() => {
    if (inView && !showSrc) {
      setShowSrc(true)

      if (videoRef.current) {
        videoRef.current.load()
      }

      if (videoRef.current && audioRef.current) {
        syncMediaPlayback(videoRef.current, audioRef.current)
      }
    }
  }, [inView, showSrc])

  return (
    <div ref={ref}>
      <video
        className="thumbnail thumbnail--video js-video"
        controls
        height={height}
        muted
        playsInline
        poster={hasPoster ? deescapeHtml(poster) : undefined}
        ref={videoRef}
        style={
          {
            '--ar-width': width,
            '--ar-height': height,
          } as React.CSSProperties
        }
        width={width}
      >
        {showSrc ? <source src="url" type="video/mp4" /> : null}
      </video>

      {hasAudio ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio controls hidden preload="none" ref={audioRef} src={audioUrl} />
      ) : null}
    </div>
  )
}

export default VideoPlayer
