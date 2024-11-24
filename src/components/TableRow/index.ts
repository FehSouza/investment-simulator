import { Children, createElement, InternalCustomElement } from '../../utils'
import styles from './styles.module.scss'

export const TableRow = (props?: InternalCustomElement<'tr'>, ...children: Children[]) => {
  const $tr = createElement('tr', { ...props, className: [styles.tableRow, props?.className].flat() }, ...children)
  return $tr
}
