export const maskNumber = (value: string) => {
  value = value.replace(/\D/g, '')
  return value
}
