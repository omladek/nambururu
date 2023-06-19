import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Fragment, JSX } from 'preact'
import { useEffect } from 'preact/hooks'
import getSubredditJSONUrl from '../utilities/getSubredditJSONUrl'
import { ThreadResult } from '../types/reddit-api/ThreadsResult.type'
import Post from './Post'
import Loader from './Loader'

interface Props {
  subreddit: string
  sort: string
}

function List({ sort, subreddit }: Props): JSX.Element {
  const { inView, ref } = useInView({ rootMargin: '500px 0px 0px 0px' })
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
            return {
              posts: [],
              after: null,
              message: 'Subreddit is empty or private.',
            }
          }

          return {
            posts: response.data.children.filter(
              (post) =>
                !post.data.stickied && !['nsfw'].includes(post.data.thumbnail),
            ),
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

  if (error) return <p className="message">⚠️An error has occurred</p>

  if (!data?.pages?.length) {
    return <p className="message">😕 No data</p>
  }

  const nonEmptyPages = data.pages.filter((page) => page.posts.length)

  if (!nonEmptyPages.length) {
    return <p className="message">😕 No data</p>
  }

  return (
    <>
      <div className="list">
        {nonEmptyPages.map((page) => {
          return (
            <Fragment key={page.after || 'page-last'}>
              {page.posts.map((post) => {
                return <Post key={post.data.id} post={post} />
              })}
            </Fragment>
          )
        })}
      </div>

      {hasNextPage ? (
        <div className="load-more-area" ref={ref}>
          <button
            className="load-more"
            disabled={!isFetchingNextPage}
            onClick={() => fetchNextPage()}
            type="button"
          >
            {isFetchingNextPage ? <>⌛loading&hellip;</> : 'load more'}
          </button>
        </div>
      ) : null}
    </>
  )
}

export default List
