interface Props {
  url: string
  height: number
  width: number
  hasAudio: boolean
  poster: string
}

const getVideoPlayerHTML = ({
  url,
  height,
  width,
  hasAudio,
  poster,
}: Props): string => {
  const audioUrl = url.replace(/_\d+/, '_audio')

  return `
    <div class="js-player">
      <video
        class="thumbnail thumbnail--video js-video"
        controls
        loading="lazy"
        poster="${poster}"
        width="${width}"
        height="${height}"
        playsinline
        muted
        style="--ar-width: ${width};--ar-height: ${height};"
      >
        <source src="${url}">
      </video>
      ${
        hasAudio
          ? `<audio
              controls
              src="${audioUrl}"
              class="js-audio"
              hidden
              ></audio>`
          : ''
      }

    </div>`
}

export default getVideoPlayerHTML
