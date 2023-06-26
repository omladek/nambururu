export default function parseSortFromURL(input: string): string | null {
  const pattern = /sort=([^&]+)/
  const match = input.match(pattern)

  if (match && match.length > 1) {
    return match[1]
  }
  return null
}
