interface Props {
  thumbnail: string
  thumbnailRetina?: string
  fullSize?: string
  height: number
  width: number
  loading: 'lazy' | 'eager' | 'auto'
}

const getThumbnailHTML = ({
  thumbnail,
  thumbnailRetina,
  fullSize,
  height,
  width,
  loading,
}: Props): string => `
  <a href="${fullSize || thumbnail}" target="_blank"><img
      class="thumbnail"
      src="${thumbnail}"
      width="${width}"
      height="${height}"
      loading="${loading}"
      decode="async"
      alt=""
      style="--ar-width: ${width};--ar-height: ${height};"
      ${thumbnailRetina ? ` srcset="${thumbnail}, ${thumbnailRetina} 2x"` : ''}
    >
  </a>`

export default getThumbnailHTML
