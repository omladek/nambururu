import { useEffect, useState, useRef } from 'preact/hooks'
import { JSX } from 'preact/compat'
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
    <div
      className="thumbnail-wrap thumbnail-wrap--video"
      style={{ '--ar-width': width, '--ar-height': height }}
    >
      {!isLoaded ? (
        <>
          <button
            aria-label="play video"
            className="thumbnail__btn"
            onClick={() => setIsLoaded((prev) => !prev)}
            type="button"
          >
            ▶
          </button>

          <img
            alt=""
            className="thumbnail thumbnail--video"
            decoding="async"
            height={height}
            loading="lazy"
            src={safePoster}
            width={width}
          />
        </>
      ) : null}

      {isLoaded ? (
        <>
          <video
            className=""
            controls
            height={height}
            muted
            playsInline
            ref={videoRef}
            width={width}
          >
            <source src={url} type="video/mp4" />
          </video>

          {hasAudio ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <audio
              className="audio"
              controls
              muted
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
