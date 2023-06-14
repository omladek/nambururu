import updateList from './updateList'
import endlessScroll from './endlessScroll'
import subredditSearch from './subredditSearch'

const setupFilter = (): void => {
  const selector = document.querySelector<HTMLSelectElement>('#subreddit')
  const form = document.querySelector<HTMLFormElement>('#filters-form')
  const loader = document.querySelector<HTMLDivElement>('#loader')
  const loadMoreBtn = document.querySelector<HTMLButtonElement>('#load-more')

  if (!loader) {
    throw new Error('Missing loader element!')
  }

  if (!loadMoreBtn) {
    throw new Error('Missing loadMore element!')
  }

  if (!selector) {
    throw new Error('Subreddit selector is missing!')
  }

  if (!form) {
    throw new Error('Subreddit form is missing!')
  }

  const submitForm = async (after = '') => {
    const { subreddit } = form

    await updateList({
      subreddit:
        subreddit.value === 'my-mix'
          ? (import.meta.env.VITE_SUBREDDITS || 'best').split(',').join('+')
          : subreddit.value,
      afterParameter: after,
    })
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    submitForm()
  })

  selector.addEventListener('change', () => {
    submitForm()
  })

  loadMoreBtn.addEventListener('click', async (event) => {
    event.preventDefault()

    const after = loadMoreBtn.getAttribute('data-after')

    if (after) {
      submitForm(after)
    }
  })

  submitForm()

  endlessScroll({ loadMoreBtn })

  subredditSearch()
}

export default setupFilter
