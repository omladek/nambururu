export default function formatNumber(
  number: number,
  locale = window.navigator.language,
): string | number {
  if (number < 1000) {
    return number
  }

  return new Intl.NumberFormat(locale).format(number)
}
