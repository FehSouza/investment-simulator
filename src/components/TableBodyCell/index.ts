import { Children, createElement, InternalCustomElement } from '../../utils'
import styles from './styles.module.scss'

export const TableBodyCell = (props?: InternalCustomElement<'td'>, ...children: Children[]) => {
  const $td = createElement('td', { ...props, className: [styles.tableBodyCell, props?.className].flat() }, ...children)
  return $td
}
