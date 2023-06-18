/* eslint-disable react/no-danger */
import { JSX } from 'preact'

interface Props {
  html: string
}

function RichText({ html }: Props): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default RichText
