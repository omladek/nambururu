interface Props {
  thumbnail: string
  height: number
  width: number
  loading: 'lazy' | 'eager' | 'auto'
}

const getThumbnailHTML = ({
  thumbnail,
  height,
  width,
  loading,
}: Props): string => `
  <a href="${thumbnail}" target="_blank"><img
    class="thumbnail"
    src="${thumbnail}"
    width="${width}"
    height="${height}"
    loading="${loading}"
    decode="async"
    alt=""
    style="--ar-width: ${width};--ar-height: ${height};"
  ></a>`

export default getThumbnailHTML
