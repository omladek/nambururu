/* eslint-disable no-console */
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { JSX } from 'preact'
import { useEffect, useMemo, useState } from 'preact/hooks'

import Post from './Post/Post'
import ErrorBoundary from './ErrorBoundary'
import getSubreddit from '../utilities/getSubreddit'
import Loader from './Loader'
import transformListData from '../utilities/transformListData'
import { SortOption } from '../constants/sortOptions'

const lazyLoadingLimit = window.matchMedia('(min-width: 40em)').matches ? 4 : 1

const postsPerPage = lazyLoadingLimit * 2

interface Props {
  subreddit: string
  sort: SortOption
}

function List({ sort, subreddit }: Props): JSX.Element {
  const { inView, ref } = useInView()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['subreddit', subreddit, sort],
    queryFn: getSubreddit,
    getNextPageParam: (lastPage) => lastPage.after || undefined,
    select: transformListData,
  })

  const posts = useMemo(() => data?.pages || [], [data?.pages])

  const postsTotal = posts.length

  const [visiblePostsLimit, setVisiblePostsLimit] = useState(postsPerPage)

  const visiblePosts = useMemo(
    () => posts.slice(0, visiblePostsLimit),
    [posts, visiblePostsLimit],
  )

  useEffect(() => {
    setVisiblePostsLimit(postsPerPage)
  }, [subreddit, sort])

  useEffect(() => {
    if (inView && visiblePostsLimit < postsTotal) {
      setVisiblePostsLimit((prev) => {
        const next = prev + postsPerPage

        if (next >= postsTotal) {
          return postsTotal
        }

        return next
      })
    } else if (
      inView &&
      visiblePostsLimit === postsTotal &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, fetchNextPage, isFetchingNextPage, postsTotal])

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

  if (!postsTotal && !hasNextPage) {
    return <p className="message">No results</p>
  }

  return (
    <div className="list">
      {visiblePosts.map((post, postIndex) => {
        return (
          <ErrorBoundary key={post.id}>
            <Post
              mediaLoading={
                postIndex + 1 <= lazyLoadingLimit ? 'eager' : 'lazy'
              }
              post={post}
            />
          </ErrorBoundary>
        )
      })}

      <div className={`load-more-area ${!hasNextPage ? 'done' : ''}`} ref={ref}>
        {hasNextPage ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>{isFetchingNextPage && <Loader />}</>
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
