const getDateFromUnixTime = (unixTime: number): string =>
  new Date(unixTime * 1000).toLocaleDateString()

export default getDateFromUnixTime
