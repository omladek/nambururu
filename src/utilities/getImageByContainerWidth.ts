import { RedditHostedImage } from '../types/reddit-api/ThreadsResult.type'

const getImageByContainerWidth = (
  arr: RedditHostedImage[],
  dpr: number,
): RedditHostedImage => {
  const containerWidth =
    document.querySelector<HTMLDivElement>('.js-post-sizer')?.offsetWidth ?? 0
  const size = Math.round(containerWidth * dpr)
  let closestX = Number.MAX_SAFE_INTEGER
  let bestMatch = arr[0]

  for (let i = 0; i < arr.length; i++) {
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
