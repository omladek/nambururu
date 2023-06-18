import { useEffect, useState, useRef } from 'react'
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioUrl = url.replace(/_\d+/, '_audio')

  const hasPoster = !(
    poster !== null &&
    ['nsfw', 'spoiler', 'default', 'self', 'image', ''].includes(poster)
  )

  const safePoster = hasPoster
    ? deescapeHtml(poster)
    : `https://www.satyr.dev/${width}x${height}/?text=reddit+video`

  useEffect(() => {
    if (videoRef.current && audioRef.current) {
      syncMediaPlayback(videoRef.current, audioRef.current)
    }

    if (videoRef.current) {
      videoRef.current.play()
    }

    if (audioRef.current) {
      audioRef.current.play()
    }
  }, [isLoaded])

  return (
    <div className="thumbnail-wrap">
      {!isLoaded ? (
        <>
          <button
            className="thumbnail__hd"
            onClick={() => setIsLoaded((prev) => !prev)}
            type="button"
          >
            load video
          </button>

          <img
            alt=""
            className="thumbnail thumbnail--video"
            decoding="async"
            height={height}
            loading="lazy"
            src={safePoster}
            style={
              {
                '--ar-width': width,
                '--ar-height': height,
              } as React.CSSProperties
            }
            width={width}
          />
        </>
      ) : null}

      {isLoaded ? (
        <>
          <video
            className="thumbnail thumbnail--video js-video"
            controls
            height={height}
            muted
            playsInline
            poster={safePoster}
            ref={videoRef}
            style={
              {
                '--ar-width': width,
                '--ar-height': height,
              } as React.CSSProperties
            }
            width={width}
          >
            <source src={url} type="video/mp4" />
          </video>

          {hasAudio ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <audio
              controls
              hidden
              preload="none"
              ref={audioRef}
              src={audioUrl}
            />
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default VideoPlayer
