import { JSX } from 'preact'
import { useContext } from 'preact/hooks'
import { route } from 'preact-router'

import NavigationContext from '../context/NavigationContext'

interface Props {
  children: JSX.Element | string
  className?: string
  activeClassName?: string
  href: string
}

export default function Link({
  activeClassName,
  children,
  className,
  href,
}: Props): JSX.Element {
  const baseUrl = href.replace('/nambururu/#/', '/')
  const appUrl = useContext(NavigationContext)
  const isActive = appUrl === baseUrl
  const classNames = [className, isActive && activeClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      className={classNames}
      data-native
      href={href}
      onClick={(event) => {
        event.preventDefault()
        route(baseUrl)
      }}
    >
      {children}
    </a>
  )
}
