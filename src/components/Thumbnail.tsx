import deescapeHtml from '../utilities/deescapeHtml'

interface Props {
  thumbnail: string
  thumbnailRetina?: string
  fullSize?: string
  height: number
  width: number
  loading?: 'lazy' | 'eager'
}

const Thumbnail = ({
  thumbnail,
  thumbnailRetina,
  fullSize,
  height,
  width,
  loading = 'lazy',
}: Props): JSX.Element => {
  return (
    <a href={deescapeHtml(fullSize || thumbnail)} target="_blank">
      <img
        className="thumbnail"
        src={deescapeHtml(thumbnail)}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        alt=""
        style={
          {
            '--ar-width': width,
            '--ar-height': height,
          } as React.CSSProperties
        }
        srcSet={`${deescapeHtml(thumbnail)}, ${deescapeHtml(
          thumbnailRetina || fullSize || thumbnail,
        )} 2x`}
      />
    </a>
  )
}

export default Thumbnail
