export default function parseSubredditFromURL(input: string): string | null {
  const pattern = /subreddit=([^&]+)/
  const match = input.match(pattern)

  if (match && match.length > 1) {
    return match[1]
  }
  return null
}
