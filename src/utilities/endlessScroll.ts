interface Props {
  loadMoreBtn: HTMLButtonElement
}

const endlessScroll = ({ loadMoreBtn }: Props): void => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !loadMoreBtn.classList.contains('is-loading')
        ) {
          loadMoreBtn.click()
        }
      })
    },
    {
      rootMargin: '500px 0px 0px',
    },
  )

  observer.observe(loadMoreBtn)
}

export default endlessScroll
