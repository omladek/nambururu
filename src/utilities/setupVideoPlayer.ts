import syncMediaPlayback from './syncMediaPlayback'

/**
 * @returns void
 */
const setupVideoPlayer = () => {
  const players = [
    ...document.querySelectorAll('.js-player:not(.js-player-initialized)'),
  ]

  if (!players.length) {
    return
  }

  players.forEach((player) => {
    player.classList.add('js-player-initialized')

    const video = player.querySelector('.js-video') as HTMLVideoElement
    const audio = player.querySelector('.js-audio') as HTMLAudioElement

    if (!video || !audio) {
      return
    }

    syncMediaPlayback(video, audio)
  })
}

export default setupVideoPlayer
