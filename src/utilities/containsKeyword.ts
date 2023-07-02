export default function containsKeyword(
  keywords: string[],
  sentence: string,
): boolean {
  const normalizedSentence = sentence.toLowerCase()
  const normalizedKeywords = keywords.map((keyword) => keyword.toLowerCase())

  return normalizedKeywords.some((keyword) =>
    normalizedSentence.includes(keyword),
  )
}
