import { JSX } from 'preact'
import { useEffect, useReducer, useRef } from 'preact/hooks'

import './LayoutMode.css'

const COMPACT_LAYOUT_CLASSNAME = 'list-layout--compact'
const COMPACT_LAYOUT_STORAGE_KEY = 'nambururu-compact-layout'

function LayoutMode(): JSX.Element {
  const bodyRef = useRef<HTMLElement>()
  const [isCompact, toggleIsCompact] = useReducer(
    (state) => {
      return !state
    },
    localStorage.getItem(COMPACT_LAYOUT_STORAGE_KEY) === 'true',
  )

  useEffect(() => {
    bodyRef.current = document.body
  }, [])

  useEffect(() => {
    if (isCompact) {
      bodyRef.current?.classList.add(COMPACT_LAYOUT_CLASSNAME)
    } else {
      bodyRef.current?.classList.remove(COMPACT_LAYOUT_CLASSNAME)
    }

    localStorage.setItem(COMPACT_LAYOUT_STORAGE_KEY, String(isCompact))
  }, [isCompact])

  return (
    <button className="layout-mode" onClick={toggleIsCompact} type="button">
      compact {isCompact ? 'on' : 'off'}
    </button>
  )
}

export default LayoutMode
