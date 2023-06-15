import deescapeHtml from '../utilities/deescapeHtml'

interface Props {
  thumbnail: string
  thumbnailRetina?: string
  fullSize?: string
  height: number
  width: number
  loading?: 'lazy' | 'eager'
}

function Thumbnail({
  fullSize = '',
  height,
  loading = 'lazy',
  thumbnail,
  thumbnailRetina = '',
  width,
}: Props): JSX.Element {
  return (
    <a
      href={deescapeHtml(fullSize || thumbnail)}
      rel="noreferrer noopener"
      target="_blank"
    >
      <img
        alt=""
        className="thumbnail"
        decoding="async"
        height={height}
        loading={loading}
        src={deescapeHtml(thumbnail)}
        srcSet={`${deescapeHtml(thumbnail)}, ${deescapeHtml(
          thumbnailRetina || fullSize || thumbnail,
        )} 2x`}
        style={
          {
            '--ar-width': width,
            '--ar-height': height,
          } as React.CSSProperties
        }
        width={width}
      />
    </a>
  )
}

export default Thumbnail
