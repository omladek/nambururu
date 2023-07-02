import { useQuery } from '@tanstack/react-query'
import { JSX } from 'preact'

import { useState } from 'preact/hooks'
import Comment from './Comment/Comment'
import Loader from './Loader'
import getCommentsPreview from '../utilities/getCommentsPreview'

interface Props {
  id: string
}

function CommentsPreview({ id }: Props): JSX.Element | null {
  const [showComments, setShowComments] = useState(false)
  const { data, error, isInitialLoading, isLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: ({ signal }) => getCommentsPreview(id, signal),
    enabled: showComments,
    cacheTime: Infinity,
    staleTime: Infinity,
  })

  if (!showComments || isLoading) {
    return (
      <button
        className={`btn btn--block ${isInitialLoading ? 'is-loading' : ''}`}
        disabled={isInitialLoading}
        onClick={() => setShowComments(true)}
        type="button"
      >
        {isInitialLoading && <Loader size="xs" />}
        <span className="btn__text">Load comments</span>
      </button>
    )
  }

  if (error) {
    return (
      <p>
        An error has occurred:
        {error instanceof Error && <span>{error.message}</span>}
      </p>
    )
  }

  if (!data?.length) {
    return <p>No relevant comments.</p>
  }

  return (
    <>
      {data.map((comment) => {
        return <Comment comment={comment} key={comment.id} />
      })}
    </>
  )
}

export default CommentsPreview
