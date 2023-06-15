import { RedditHostedImage } from '../types/reddit-api/ThreadsResult.type'

const getImageByContainerWidth = (
  arr: RedditHostedImage[],
  dpr: number,
  containerWidth: number,
): RedditHostedImage => {
  const size = Math.round(containerWidth * dpr)
  let closestX = Number.MAX_SAFE_INTEGER
  let bestMatch = arr[0]

  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i]
    const diff = Math.abs(item.x - size)

    if (diff < closestX) {
      closestX = diff
      bestMatch = item
    }
  }

  return bestMatch
}

export default getImageByContainerWidth
