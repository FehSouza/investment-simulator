import { CalcCompoundInterestProps, calcCompoundInterest } from '../calcCompoundInterest'
import { calcMonthlyInterestRate } from '../calcMonthlyInterestRate'
import { compoundInterestByYear } from '../compoundInterestByYear'

export const compoundInterest = ({ initial, monthly, interest, duration }: CalcCompoundInterestProps) => {
  const monthlyInterestRate = calcMonthlyInterestRate(interest)
  const compoundInterest = calcCompoundInterest({ initial, monthly, interest: monthlyInterestRate, duration })
  const results = compoundInterestByYear(compoundInterest)
  return results
}
