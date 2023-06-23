import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'preact/hooks'
import { JSX } from 'preact'

import {
  CommentsResult,
  Comment as CommentType,
} from '../types/reddit-api/CommentsResult.type'
import Comment from './Comment'
import Loader from './Loader'

interface Props {
  id: string
}

function CommentsPreview({ id }: Props): JSX.Element | null {
  const { data, error, isLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: ({ signal }) =>
      Promise.all([
        fetch(
          `https://www.reddit.com/comments/${id}/.json?limit=2&sort=best&json_raw=1`,
          { signal },
        ).then(async (response) => {
          const comments: CommentsResult[] = await response.json()

          return { comments, type: 'best' }
        }),
        fetch(
          `https://www.reddit.com/comments/${id}/.json?limit=2&sort=controversial&json_raw=1`,
          { signal },
        ).then(async (response) => {
          const comments: CommentsResult[] = await response.json()

          return { comments, type: 'controversial' }
        }),
      ]),
  })

  const uniqueComments: CommentType[] = useMemo(() => {
    if (!data?.length) {
      return []
    }

    const unique: CommentType[] = []

    data.forEach((commentsByVotes) => {
      const { comments, type } = commentsByVotes
      const groups = comments.map((group) =>
        group.data.children.filter((comment) => !comment.data.stickied),
      )

      groups.forEach((group) => {
        let found = false

        group
          .filter((comment) => !!comment?.data?.body?.trim())
          .forEach((comment) => {
            if (found) {
              return
            }

            const commentId = comment.data.id

            if (unique.find((uniq) => uniq.data.id === commentId)) {
              return
            }

            found = true

            unique.push({ ...comment, data: { ...comment.data, author: type } })
          })
      })
    })

    return unique
  }, [data])

  if (isLoading) return <Loader size="xs" />

  if (error) {
    return (
      <p>
        An error has occurred:
        {error instanceof Error && <span>{error.message}</span>}
      </p>
    )
  }

  if (!uniqueComments?.length) {
    return <p>No comments</p>
  }

  return (
    <>
      {uniqueComments.map((k) => {
        return <Comment comment={k} key={k.data.id} />
      })}
    </>
  )
}

export default CommentsPreview
