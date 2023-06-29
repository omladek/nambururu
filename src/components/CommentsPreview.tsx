import { useQuery } from '@tanstack/react-query'
import { JSX } from 'preact'

import Comment from './Comment'
import Loader from './Loader'
import getCommentsPreview from '../utilities/getCommentsPreview'

interface Props {
  id: string
}

function CommentsPreview({ id }: Props): JSX.Element | null {
  const { data, error, isLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: ({ signal }) => getCommentsPreview(id, signal),
  })

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
