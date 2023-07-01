import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Fragment, JSX } from 'preact'
import { useEffect } from 'preact/hooks'

import Post from './Post/Post'
import Loader from './Loader'
import ErrorBoundary from './ErrorBoundary'
import getSubreddit from '../utilities/getSubreddit'

interface Props {
  subreddit: string
  sort: string
}

function List({ sort, subreddit }: Props): JSX.Element {
  const { inView, ref } = useInView({
    rootMargin: '500px 0px 0px 0px',
    initialInView: true,
  })
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['subreddit', subreddit, sort],
    queryFn: ({ pageParam = '', signal }) =>
      getSubreddit({ subreddit, after: pageParam, signal, sort }),
    getNextPageParam: (lastPage) => lastPage.after || undefined,
  })

  const lazyLoadingLimit = window.matchMedia('(min-width: 40em)').matches
    ? 4
    : 1

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, isFetchingNextPage])

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

  if (!nonEmptyPages.length && !hasNextPage) {
    return <p className="message">No results</p>
  }

  return (
    <div className="list">
      {nonEmptyPages.map((page) => {
        return (
          <Fragment key={page.after || 'page-last'}>
            {page.posts.map((post, postIndex) => {
              return (
                <ErrorBoundary key={post.uniqueId}>
                  <Post
                    mediaLoading={
                      postIndex <= lazyLoadingLimit ? 'eager' : 'lazy'
                    }
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
