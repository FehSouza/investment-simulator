import { randomId, createElement } from '../../utils'
import styles from './styles.module.scss'

type InputEvent = Exclude<Event, 'target'> & { target: HTMLInputElement }
export type Field = HTMLDivElement & { getValue: () => string; setValue: (value: string) => void }

interface InputProps {
  label: string
  prefix: string
  placeholder: string
  oninput: (event: InputEvent) => void
  htmlFor?: string
  value?: string
  maxLength?: number
}

export const Input = ({ label, prefix, placeholder, oninput, htmlFor, value, maxLength }: InputProps) => {
  const id = htmlFor ?? `input-element-${randomId()}`

  const $label = createElement('label', { htmlFor: id }, label)
  const $prefix = createElement('span', null, prefix)
  const $input = createElement('input', { placeholder, id, value, maxLength, oninput: (e) => oninput(e as InputEvent) })
  const $wrapper = createElement('div', null, $prefix, $input)
  const $field = createElement('div', { className: styles.field }, $label, $wrapper) as Field

  $field.getValue = () => $input.value
  $field.setValue = (value: string) => ($input.value = value)

  return $field
}
