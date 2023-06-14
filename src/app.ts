import getFiltersHTML from './utilities/getFiltersHTML'
import setupFilter from './utilities/setupFilter'
import './style.css'

const root = document.querySelector<HTMLDivElement>('#root')

if (!root) {
  throw new Error('Root element is missing!')
}

const buildApp = async () => {
  const filtersHTML = await getFiltersHTML()

  root.innerHTML = `
    <header class="header">
      <h1 class="header__title"">Redditlite</h1>
    </header>
    <main class="main">
      <div class="list">
        <div class="post" id="post-sizer"></div>
      </div>
      <div id="list" class="list">
        <div class="loader" id="loader">loading&hellip;</div>
      </div>
      <button class="load-more" id="load-more" type="button">load more</button>
    </main>
    <div id="toaster" class="toaster"></div>
    <footer id="filters" class="filters">${filtersHTML}</footer>
  `

  setupFilter()
}

buildApp()
