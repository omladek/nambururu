import { useInfiniteQuery } from '@tanstack/react-query'
import getSubredditJSONUrl from '../utilities/getSubredditJSONUrl'
import { ThreadResult } from '../types/reddit-api/ThreadsResult.type'
import { useInView } from 'react-intersection-observer'
import Post from './Post'
import Loader from './Loader'
import { Fragment, useEffect } from 'react'

interface Props {
  subreddit: string
}

const List = ({ subreddit }: Props): JSX.Element => {
  const { ref, inView } = useInView()
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['subreddit', subreddit],
    queryFn: ({ pageParam = '' }) =>
      fetch(getSubredditJSONUrl(subreddit, pageParam))
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
        .catch((error) => {
          if (error.name === 'AbortError') {
            return {
              posts: [],
              after: null,
              message: null,
            }
          }

          console.error(error)

          return {
            posts: [],
            after: null,
            message: error.reason || error.message,
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
            <Fragment key={page.after || 'page'}>
              {page.posts.map((post) => {
                return <Post {...post} key={post.data.name} />
              })}
            </Fragment>
          )
        })}
      </div>

      {hasNextPage && (
        <button
          ref={ref}
          type="button"
          className="load-more"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? 'is loading' : 'load more'}
        </button>
      )}
    </>
  )
}

export default List
