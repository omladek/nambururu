export default function getItemsPerLine(): number {
  const gridContainer = document.querySelector<HTMLDivElement>('.list')
  const gridItem = document.querySelector<HTMLDivElement>('.post')

  if (!gridContainer || !gridItem) {
    return 10
  }

  const containerWidth = gridContainer.clientWidth
  const itemWidth = gridItem.offsetWidth
  const computedStyles = getComputedStyle(gridContainer)
  const gridGap = parseFloat(computedStyles.gridColumnGap)

  // Calculate the number of items per line
  return Math.floor((containerWidth + gridGap) / (itemWidth + gridGap))
}
