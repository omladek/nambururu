import { Comment as CommentType } from '../types/reddit-api/CommentsResult.type'
import deescapeHtml from '../utilities/deescapeHtml'

interface Props {
  comment: CommentType
}

function Comment({ comment }: Props): JSX.Element {
  return (
    <div>
      <strong>{comment.data.author}</strong>

      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: deescapeHtml(comment.data.body_html),
        }}
      />
    </div>
  )
}

export default Comment
