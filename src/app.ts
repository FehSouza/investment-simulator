import { Input } from './components'
import { createElement, maskCurrency, maskInterest, maskNumber } from './utils'
import styles from './app.module.scss'

export const App = () => {
  const initialInput = Input({
    prefix: 'R$',
    placeholder: '0,00',
    label: 'Valor inicial do investimento',
    oninput: (event) => (event.target.value = maskCurrency(event.target.value)),
  })

  const monthlyInput = Input({
    prefix: 'R$',
    placeholder: '0,00',
    label: 'Valor dos aportes mensais',
    oninput: (event) => (event.target.value = maskCurrency(event.target.value)),
  })

  const interestInput = Input({
    prefix: '%',
    placeholder: '0,00',
    label: 'Taxa de juros anual',
    maxLength: 6,
    oninput: (event) => (event.target.value = maskInterest(event.target.value)),
  })

  const durationInput = Input({
    prefix: 'Anos',
    placeholder: '0',
    label: 'Duração do investimento',
    oninput: (event) => (event.target.value = maskNumber(event.target.value)),
  })

  const fieldsContainer = createElement(
    'div',
    { className: styles.fieldsContainer },
    initialInput,
    monthlyInput,
    interestInput,
    durationInput
  )

  const submitButton = createElement('button', { disabled: true }, 'Calcular')
  const cleanButton = createElement('button', { disabled: true }, 'Limpar')

  const buttonsContainer = createElement('div', { className: styles.buttonsContainer }, submitButton, cleanButton)

  const title = createElement('h1', null, 'Simulador de Juros Compostos')
  const formContainer = createElement('form', { className: styles.formContainer }, fieldsContainer, buttonsContainer)
  const resultsContainer = createElement('div', { className: styles.resultsContainer })

  return [title, formContainer, resultsContainer]
}
