import getListOfSubreddits from './utilities/getListOfSubreddits'
import getSubredditsSelector from './utilities/getSubredditsSelector'
import setupFilter from './utilities/setupFilter'

export const DEFAULT_LIMIT = 10

const buildApp = async () => {
  const filters = document.getElementById('filters') as HTMLDivElement
  const list = document.getElementById('list') as HTMLDivElement
  const loader = document.getElementById('loader') as HTMLDivElement
  const loadMoreBtn = document.getElementById('load-more') as HTMLButtonElement
  const toaster = document.getElementById('toaster') as HTMLDivElement
  const postSizer = document.getElementById('post-sizer') as HTMLDivElement

  if (!filters) {
    throw new Error('Missing filters element!')
  }

  if (!list) {
    throw new Error('Missing list element!')
  }

  if (!loader) {
    throw new Error('Missing loader element!')
  }

  if (!loadMoreBtn) {
    throw new Error('Missing loadMore element!')
  }

  if (!toaster) {
    throw new Error('Missing toaster element!')
  }

  if (!postSizer) {
    throw new Error('Missing postSizer element!')
  }

  const allSubreddits = await getListOfSubreddits()

  filters.innerHTML = getSubredditsSelector(allSubreddits)

  setupFilter({ loadMoreBtn, filters, list, loader, toaster, postSizer })
}

buildApp()
