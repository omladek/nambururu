export default function parseYouTubeVideoId(embeddedString: string): string {
  const regex = /youtube\.com\/embed\/([\w-]{11})/i
  const match = embeddedString.match(regex)

  if (match && match.length >= 2) {
    return match[1]
  }

  throw new Error('YouTube video ID not found in the source string.')
}
