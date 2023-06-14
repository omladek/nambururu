import getPostHTML from './getPostHTML'
import getSubreddit from './getSubreddit'
import setupVideoPlayer from './setupVideoPlayer'

interface Props {
  subreddit: string
  afterParameter: string
}

const updateList = async ({
  subreddit,
  afterParameter = '',
}: Props): Promise<void> => {
  const list = document.querySelector<HTMLDivElement>('#list')
  const loadMoreBtn = document.querySelector<HTMLButtonElement>('#load-more')
  const toaster = document.querySelector<HTMLDivElement>('#toaster')

  if (!list) {
    throw new Error('Missing list element!')
  }

  if (!loadMoreBtn) {
    throw new Error('Missing loadMore element!')
  }

  if (!toaster) {
    throw new Error('Missing toaster element!')
  }

  if (afterParameter) {
    loadMoreBtn.classList.add('is-loading')
  } else {
    list.innerHTML = `<div class="loader" id="loader">loading&hellip;</div>`

    window.scrollTo(0, 0)
  }

  const { posts, after, message } = await getSubreddit(
    subreddit,
    afterParameter,
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
