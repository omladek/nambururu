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
  const { data, error, isLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: ({ signal }) => getCommentsPreview(id, signal),
    enabled: showComments,
    cacheTime: Infinity,
    staleTime: Infinity,
  })

  if (!showComments) {
    return (
      <button
        className="btn btn--block"
        onClick={() => setShowComments(true)}
        type="button"
      >
        Load comments
      </button>
    )
  }

  if (isLoading) return <Loader size="xs" />

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
