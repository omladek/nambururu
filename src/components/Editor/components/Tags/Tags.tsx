import { JSX } from 'preact'

import './Tags.css'

interface Props {
  value: string
  onClick: (tag: string) => void
}

function Tags({ onClick, value }: Props): JSX.Element | null {
  const tags = (value || '').split(',').filter(Boolean)

  if (!tags.length) {
    return null
  }

  return (
    <div className="tags">
      {tags.map((tag) => {
        return (
          <button
            className="btn tags__tag"
            key={tag}
            onClick={() => {
              onClick(tag)
            }}
            type="button"
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}

export default Tags
