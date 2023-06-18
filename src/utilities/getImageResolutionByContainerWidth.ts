interface Item {
  url: string
  width: number
  height: number
}

export default function getImageResolutionByContainerWidth(
  data: Item[],
  containerWidth: number,
): Item | null {
  let closestItem: Item | null = null
  let minDifference = Number.MAX_SAFE_INTEGER

  data.forEach((item) => {
    const difference = Math.abs(item.width - containerWidth)
    if (difference < minDifference) {
      minDifference = difference
      closestItem = item
    }
  })

  return closestItem
}
