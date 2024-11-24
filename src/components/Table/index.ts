import { CompoundInterestProps, createElement, formatToCurrency } from '../../utils'
import { TableBodyCell } from '../TableBodyCell'
import { TableHeadCell } from '../TableHeadCell'
import { TableRow } from '../TableRow'
import styles from './styles.module.scss'

interface TableProps {
  results: CompoundInterestProps[]
}

export const Table = ({ results }: TableProps) => {
  const $headRow = TableRow(
    null,
    TableHeadCell(null, 'Ano'),
    TableHeadCell(null, 'Total investido'),
    TableHeadCell(null, 'Total em juros'),
    TableHeadCell(null, 'Total final')
  )

  const $thead = createElement('thead', null, $headRow)

  const rows = results.map((result) => {
    const year = result.year
    const investment = formatToCurrency(result.investment)
    const income = formatToCurrency(result.income)
    const total = formatToCurrency(result.total)

    const $bodyRow = TableRow(
      null,
      TableBodyCell(null, year),
      TableBodyCell(null, investment),
      TableBodyCell(null, income),
      TableBodyCell(null, total)
    )

    return $bodyRow
  })

  const $tbody = createElement('tbody', null, ...rows)

  const $table = createElement('table', { className: styles.tableContainer }, $thead, $tbody)
  return $table
}
