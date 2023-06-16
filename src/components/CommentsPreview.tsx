import { useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import { CommentsResult } from '../types/reddit-api/CommentsResult.type'
import Comment from './Comment'

interface Props {
  id: string
}

function CommentsPreview({ id }: Props): JSX.Element | null {
  const { data, error, isLoading } = useQuery<
    CommentsResult[][],
    { message: string; reason?: string }
  >({
    queryKey: ['subreddit-search', id],
    queryFn: ({ signal }) =>
      Promise.all([
        fetch(
          `https://www.reddit.com/comments/${id}/.json?limit=1&sort=top&json_raw=1`,
          { signal },
        ).then((response) => response.json()),
        fetch(
          `https://www.reddit.com/comments/${id}/.json?limit=1&sort=controversial&json_raw=1`,
          { signal },
        ).then((response) => response.json()),
      ]),
  })

  const hasComments = useMemo(() => {
    if (!data?.length) {
      return false
    }

    let result = true

    for (let index = 0; index < data.length; index += 1) {
      if (!data[index][1]?.data?.children?.length) {
        result = false
        break
      }
    }

    return result
  }, [data])

  if (isLoading) return <p>loading comments...</p>

  if (error) {
    return (
      <p>
        An error has occurred:
        {error.message}
      </p>
    )
  }

  if (!hasComments) {
    return <p>No comments</p>
  }

  return (
    <>
      {data.map((comment, index) => {
        const commentId = comment[1].data.children[0].data.id

        if (index < data.length - 1) {
          const nextId = data[index + 1][1].data.children[0].data.id
          const isSame = nextId === commentId

          if (isSame) {
            return null
          }
        }

        return <Comment comment={comment[1].data.children[0]} key={commentId} />
      })}
    </>
  )
}

export default CommentsPreview
