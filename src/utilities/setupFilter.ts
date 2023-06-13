import updateList from './updateList'
import endlessScroll from './endlessScroll'

interface Props {
  loadMoreBtn: HTMLButtonElement
  list: HTMLDivElement
  filters: HTMLDivElement
  loader: HTMLDivElement
  toaster: HTMLDivElement
  postSizer: HTMLDivElement
}

const setupFilter = ({
  loadMoreBtn,
  toaster,
  list,
  postSizer,
}: Props): void => {
  const selector = document.getElementById('subreddit') as HTMLSelectElement
  const form = document.getElementById('filters-form') as HTMLFormElement
  const limit = document.getElementById('limit') as HTMLSelectElement

  if (!selector) {
    throw new Error('Subreddit selector is missing!')
  }

  if (!form) {
    throw new Error('Subreddit form is missing!')
  }

  if (!limit) {
    throw new Error('Subreddit limit is missing!')
  }

  const submitForm = async (after = '') => {
    const { limit, subreddit } = form

    await updateList({
      subreddit:
        subreddit.value === 'my-mix'
          ? (import.meta.env.VITE_SUBREDDITS || 'best').split(',').join('+')
          : subreddit.value,
      afterParameter: after,
      limit: parseInt(limit.value, 10),
      loadMoreBtn,
      list,
      toaster,
      postSizer,
    })
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    submitForm()
  })

  selector.addEventListener('change', () => {
    submitForm()
  })

  limit.addEventListener('change', () => {
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
}

export default setupFilter
