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
      <h3 className="comment__title">
        {comment.data.author} ({formatNumber(comment.data.ups)})
      </h3>

      <div className="comment__body">
        <RichText
          html={updateAnchorTags(deescapeHtml(comment.data.body_html))}
        />
      </div>
    </section>
  )
}

export default Comment
