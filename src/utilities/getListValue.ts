const getListValue = (id: string): string[] =>
  (localStorage.getItem(id) || '').split(',').filter(Boolean) || []

export default getListValue
