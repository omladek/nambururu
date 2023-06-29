import { JSX } from 'preact'

import { NormalizedComment } from '../types/reddit-api/CommentsResult.type'
import RichText from './RichText'

interface Props {
  comment: NormalizedComment
}

function Comment({ comment }: Props): JSX.Element {
  const { text, upVotes, voteResult } = comment

  return (
    <section className="comment">
      <h3 className="comment__title">
        {voteResult} ({upVotes})
      </h3>

      <div className="comment__body">
        <RichText html={text} />
      </div>
    </section>
  )
}

export default Comment
