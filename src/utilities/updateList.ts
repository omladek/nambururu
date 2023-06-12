import getPostHTML from './getPostHTML'
import getSubreddit from './getSubreddit'
import setupVideoPlayer from './setupVideoPlayer'

interface Props {
  subreddit: string
  afterParameter: string
  limit: number
  loadMoreBtn: HTMLButtonElement
  list: HTMLDivElement
  toaster: HTMLDivElement
}

const updateList = async ({
  subreddit,
  afterParameter = '',
  limit,
  loadMoreBtn,
  list,
  toaster,
}: Props): Promise<void> => {
  if (afterParameter) {
    loadMoreBtn.classList.add('is-loading')
  } else {
    list.innerHTML = `<div class="loader" id="loader">loading&hellip;</div>`

    window.scrollTo(0, 0)
  }

  const { posts, after, message } = await getSubreddit(
    subreddit,
    afterParameter,
    limit,
  )
  const filteredPosts = posts.filter((post) => !post.data.stickied)

  const postsHTML = filteredPosts
    .map((post, postIndex) => getPostHTML(post, postIndex))
    .join('')

  if (afterParameter) {
    list.innerHTML = list.innerHTML + postsHTML
  } else {
    list.innerHTML = postsHTML
  }

  if (after) {
    loadMoreBtn.style.display = 'inline-block'
    loadMoreBtn.setAttribute('data-after', after)
  } else {
    loadMoreBtn.style.display = 'none'
    loadMoreBtn.setAttribute('data-after', '')
  }

  loadMoreBtn.classList.remove('is-loading')

  toaster.innerHTML = message || ''

  setupVideoPlayer()
}

export default updateList
