const syncMediaPlayback = (
  videoElement: HTMLVideoElement,
  audioElement: HTMLAudioElement,
): void => {
  const syncPlayback = (): void => {
    if (videoElement.paused || videoElement.ended) {
      audioElement.pause()
    } else {
      audioElement.play()
    }
  }

  const syncTime = (): void => {
    audioElement.currentTime = videoElement.currentTime
  }

  videoElement.addEventListener('play', syncPlayback)
  videoElement.addEventListener('pause', syncPlayback)
  videoElement.addEventListener('ended', syncPlayback)
  videoElement.addEventListener('timeupdate', syncTime)

  audioElement.addEventListener('play', syncPlayback)
  audioElement.addEventListener('pause', syncPlayback)
}

export default syncMediaPlayback
