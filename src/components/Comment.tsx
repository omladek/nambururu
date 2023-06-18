import { JSX } from 'preact'
import { Comment as CommentType } from '../types/reddit-api/CommentsResult.type'
import deescapeHtml from '../utilities/deescapeHtml'
import formatNumber from './formatNumber'
import getDateFromUnixTime from '../utilities/getDateFromUnixTime'

interface Props {
  comment: CommentType
}

function Comment({ comment }: Props): JSX.Element {
  return (
    <section className="comment">
      <strong className="comment__rating">{comment.data.author}</strong>

      <strong className="comment__rating"> | </strong>

      <strong className="comment__rating">
        {formatNumber(comment.data.ups)}
      </strong>

      <strong className="comment__rating"> | </strong>

      <strong className="comment__rating">
        {getDateFromUnixTime(comment.data.created_utc)}
      </strong>

      <div className="comment__body">
        {deescapeHtml(comment.data.body_html)}
      </div>
    </section>
  )
}

export default Comment
