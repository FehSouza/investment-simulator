export const maskCurrency = (value: string) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/^0+(?!$)/, '')
  value = value.padStart(3, '0')
  value = value.replace(/(\d+)(\d{2})$/, '$1,$2')
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  return value
}
