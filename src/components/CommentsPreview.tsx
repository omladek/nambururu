import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'preact/hooks'
import { JSX } from 'preact'

import {
  CommentsResult,
  Comment as CommentType,
} from '../types/reddit-api/CommentsResult.type'
import Comment from './Comment'

interface Props {
  id: string
}

function CommentsPreview({ id }: Props): JSX.Element | null {
  const { data, error, isLoading } = useQuery<
    CommentsResult[][],
    { message: string; reason?: string }
  >({
    queryKey: ['comments', id],
    queryFn: ({ signal }) =>
      Promise.all([
        fetch(
          `https://www.reddit.com/comments/${id}/.json?limit=2&sort=best&json_raw=1`,
          { signal },
        ).then((response) => response.json()),
        fetch(
          `https://www.reddit.com/comments/${id}/.json?limit=2&sort=controversial&json_raw=1`,
          { signal },
        ).then((response) => response.json()),
      ]),
  })

  const uniqueComments: CommentType[] = useMemo(() => {
    if (!data?.length) {
      return []
    }

    const unique: CommentType[] = []

    data.forEach((commentsByVotes) => {
      const groups = commentsByVotes.map((group) =>
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

            unique.push(comment)
          })
      })
    })

    return unique
  }, [data])

  if (isLoading) return <p>loading comments&hellip;</p>

  if (error) {
    return (
      <p>
        An error has occurred:
        {error.message}
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
