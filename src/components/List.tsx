import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Fragment, JSX } from 'preact'
import { useEffect } from 'preact/hooks'

import getSubredditJSONUrl from '../utilities/getSubredditJSONUrl'
import { ThreadResult } from '../types/reddit-api/ThreadsResult.type'
import Post from './Post'
import Loader from './Loader'
import ErrorBoundary from './ErrorBoundary'
import containsKeyword from '../utilities/containsKeyword'

interface Props {
  subreddit: string
  sort: string
}

function List({ sort, subreddit }: Props): JSX.Element {
  const myBlockedSubreddits = (
    localStorage.getItem('myBlockedSubreddits')?.split(',') || []
  )
    .map((blockedSubreddit) => blockedSubreddit.toLowerCase())
    .filter(Boolean)
  const myBlockedTitleKeywords = (
    localStorage.getItem('myBlockedTitleKeywords')?.split(',') || []
  )
    .map((keyword) => keyword.toLowerCase())
    .filter(Boolean)
  const { inView, ref } = useInView({ rootMargin: '500px 0px 0px 0px' })
  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['subreddit', subreddit, sort],
      queryFn: ({ pageParam = '', signal }) =>
        fetch(getSubredditJSONUrl({ subreddit, after: pageParam, sort }), {
          signal,
        })
          .then((response) => response.json())
          .then((response: ThreadResult) => {
            if (
              typeof response !== 'object' ||
              typeof response.data !== 'object' ||
              !Array.isArray(response.data.children)
            ) {
              throw new Error(JSON.stringify(response, null, 2))
            }

            const filteredPosts = response.data.children.filter((post) => {
              // ignore moderator notices, etc.
              if (post.data.stickied) {
                return false
              }

              // must be logged-in to view nsfw
              if (['nsfw'].includes(post.data.thumbnail)) {
                return false
              }

              // blocked by user subreddit(s) preferences
              if (
                myBlockedSubreddits.includes(post.data.subreddit.toLowerCase())
              ) {
                return false
              }

              // blocked by user title keyword(s) preferences
              return !containsKeyword(
                myBlockedTitleKeywords,
                post.data.title.toLowerCase(),
              )
            })

            return {
              posts: filteredPosts,
              after: response.data.after,
            }
          })
          .catch((err) => {
            if (err.name !== 'AbortError') {
              throw new Error(err.reason || err.message)
            }

            return {
              posts: [],
              after: null,
            }
          }),
      getNextPageParam: (lastPage) => lastPage.after,
    })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isLoading) return <Loader isFullScreen />

  if (error)
    return (
      <div className="message" role="alert">
        <p>
          An error has occurred:{' '}
          {error instanceof Error && <span>{error.message}</span>}
        </p>
      </div>
    )

  const nonEmptyPages = (data?.pages || []).filter((page) => page.posts.length)

  const isBlocked = myBlockedSubreddits.includes(subreddit.toLowerCase())

  if (isBlocked) {
    return <p className="message">This subreddit is blocked by you!</p>
  }

  if (!nonEmptyPages.length) {
    return <p className="message">No results</p>
  }

  return (
    <div className="list">
      {nonEmptyPages.map((page) => {
        return (
          <Fragment key={page.after || 'page-last'}>
            {page.posts.map((post, postIndex) => {
              return (
                <ErrorBoundary key={post.data.id}>
                  <Post
                    key={post.data.id}
                    mediaLoading={postIndex === 0 ? 'eager' : 'lazy'}
                    post={post}
                  />
                </ErrorBoundary>
              )
            })}
          </Fragment>
        )
      })}

      <div className="load-more-area" ref={ref}>
        {hasNextPage ? (
          <Loader />
        ) : (
          <div className="end">
            <p>That&apos;s all</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default List
