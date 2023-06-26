import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Fragment, JSX } from 'preact'
import { useEffect } from 'preact/hooks'

import Loader from '../Loader'
import SubredditCard from '../SubredditCard/SubredditCard'
import ErrorBoundary from '../ErrorBoundary'
import getSubreddits from '../../utilities/getSubreddits'
import './Subreddits.css'

function Subreddits(): JSX.Element {
  const { inView, ref } = useInView({ rootMargin: '500px 0px 0px 0px' })
  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['subreddits'],
      queryFn: ({ pageParam = '', signal }) =>
        getSubreddits({ after: pageParam, signal }),
      getNextPageParam: (lastPage) => lastPage.after || undefined,
      cacheTime: Infinity,
      staleTime: Infinity,
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

  const nonEmptyPages = (data?.pages || []).filter((page) => page.items.length)

  if (!nonEmptyPages.length) {
    return <p className="message">No results</p>
  }

  return (
    <div className="subreddits">
      {nonEmptyPages.map((page) => {
        return (
          <Fragment key={page.after || 'page-last'}>
            {page.items.map((subreddit) => {
              return (
                <ErrorBoundary key={subreddit.data.id}>
                  <SubredditCard subreddit={subreddit.data} />
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

export default Subreddits
