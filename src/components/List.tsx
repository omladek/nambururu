import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Fragment, useEffect, lazy, Suspense } from 'react'
import getSubredditJSONUrl from '../utilities/getSubredditJSONUrl'
import { ThreadResult } from '../types/reddit-api/ThreadsResult.type'

import Loader from './Loader'

const Post = lazy(() => import('./Post'))

interface Props {
  subreddit: string
}

function List({ subreddit }: Props): JSX.Element {
  const { inView, ref } = useInView()
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['subreddit', subreddit],
    queryFn: ({ pageParam = '', signal }) =>
      fetch(getSubredditJSONUrl(subreddit, pageParam), { signal })
        .then((response) => response.json())
        .then((response: ThreadResult) => {
          if (
            typeof response !== 'object' ||
            typeof response.data !== 'object' ||
            !Array.isArray(response.data.children)
          ) {
            return {
              posts: [],
              after: null,
              message: 'Subreddit is empty or private.',
            }
          }

          return {
            posts: response.data.children,
            after: response.data.after,
            message: null,
          }
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            return {
              posts: [],
              after: null,
              message: null,
            }
          }

          return {
            posts: [],
            after: null,
            message: err.reason || err.message,
          }
        }),
    getNextPageParam: (lastPage) => lastPage.after,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isLoading) return <Loader />

  if (error) return <p>An error has occurred</p>

  if (!data?.pages?.length) {
    return <p>No data</p>
  }

  return (
    <>
      <div className="list">
        {data?.pages.map((page) => {
          return (
            <Fragment key={page.after || 'page-last'}>
              {page.posts.map((post) => {
                return (
                  <Suspense fallback={null} key={post.data.id}>
                    <Post key={post.data.id} post={post} />
                  </Suspense>
                )
              })}
            </Fragment>
          )
        })}
      </div>

      {hasNextPage ? (
        <button
          className="load-more"
          disabled={!isFetchingNextPage}
          onClick={() => fetchNextPage()}
          ref={ref}
          type="button"
        >
          {isFetchingNextPage ? 'is loading' : 'load more'}
        </button>
      ) : null}
    </>
  )
}

export default List
