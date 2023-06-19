import { JSX } from 'preact'
import { Comment as CommentType } from '../types/reddit-api/CommentsResult.type'
import deescapeHtml from '../utilities/deescapeHtml'
import formatNumber from './formatNumber'
import RichText from './RichText'
import updateAnchorTags from '../utilities/updateAnchorTags'

interface Props {
  comment: CommentType
}

function Comment({ comment }: Props): JSX.Element {
  return (
    <section className="comment">
      <strong className="comment__rating">
        {comment.data.author} ({formatNumber(comment.data.ups)})
      </strong>

      <div className="comment__body">
        <RichText
          html={updateAnchorTags(deescapeHtml(comment.data.body_html))}
        />
      </div>
    </section>
  )
}

export default Comment
