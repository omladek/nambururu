import syncMediaPlayback from './syncMediaPlayback'

const lazyVideoObserver = new IntersectionObserver((entries) => {
  entries.forEach((player) => {
    if (player.isIntersecting) {
      const playerElement = player.target as HTMLDivElement
      const video = playerElement.querySelector('.js-video') as HTMLVideoElement
      const audio = playerElement.querySelector('.js-audio') as HTMLAudioElement
      const source = playerElement.querySelector(
        '.js-source',
      ) as HTMLSourceElement

      lazyVideoObserver.unobserve(playerElement)

      if (source) {
        source.src = source.dataset.src || ''

        video.load()

        if (audio) {
          syncMediaPlayback(video, audio)
        }
      }
    }
  })
})

const setupVideoPlayer = (): void => {
  const players = [
    ...document.querySelectorAll('.js-player:not(.js-player-initialized)'),
  ]

  if (!players.length) {
    return
  }

  players.forEach((player) => {
    player.classList.add('js-player-initialized')

    const video = player.querySelector('.js-video') as HTMLDivElement

    if (!video) {
      return
    }

    lazyVideoObserver.observe(player)
  })
}

export default setupVideoPlayer
