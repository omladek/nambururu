const deescapeHtml = (unsafeHTML: string): string =>
  unsafeHTML
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")

export default deescapeHtml
