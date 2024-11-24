import { Children, createElement, InternalCustomElement } from '../../utils'
import styles from './styles.module.scss'

export const TableHeadCell = (props?: InternalCustomElement<'th'>, ...children: Children[]) => {
  const $th = createElement('th', { ...props, className: [styles.tableHeadCell, props?.className].flat() }, ...children)
  return $th
}
