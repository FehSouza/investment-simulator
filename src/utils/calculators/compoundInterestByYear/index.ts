export interface CompoundInterestProps {
  investment: number
  income: number
  total: number
  year: number
}

export const compoundInterestByYear = (list: CompoundInterestProps[]) =>
  list.filter((item) => Number.isInteger(item.year))
