export const formatToNumber = (value: string) => {
  value = value.replace(/\./g, '')
  value = value.replace(/\,/g, '.')
  return Number(value)
}
