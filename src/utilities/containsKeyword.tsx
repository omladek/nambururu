export default function containsKeyword(
  keywords: string[],
  sentence: string,
): boolean {
  return keywords.some((keyword) => sentence.includes(keyword))
}
