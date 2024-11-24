export const calcMonthlyInterestRate = (interest: number) => {
  const annualRate = interest / 100
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1
  return monthlyRate
}
