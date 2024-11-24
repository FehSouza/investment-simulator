export interface CalcCompoundInterestProps {
  initial: number
  monthly: number
  interest: number
  duration: number
}

export const calcCompoundInterest = ({ initial, monthly, interest, duration }: CalcCompoundInterestProps) => {
  const months = [...Array(duration * 12).keys()]

  const calc = months.reduce((acc, month) => {
    const lastItem = acc[acc.length - 1]

    const oldInvestment = lastItem?.investment || initial
    const oldIncome = lastItem?.income || 0
    const oldTotal = lastItem?.total || initial

    const partialIncome = oldTotal * interest

    const investment = oldInvestment + monthly
    const income = oldIncome + partialIncome
    const total = oldTotal + partialIncome + monthly
    const year = (month + 1) / 12

    return (acc = [...acc, { investment, income, total, year }])
  }, [] as { investment: number; income: number; total: number; year: number }[])

  return calc
}
