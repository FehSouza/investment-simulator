import { Field, Input } from './components'
import { createElement, formatToNumber, maskCurrency, maskInterest, maskNumber } from './utils'
import styles from './app.module.scss'

export const App = () => {
  const inputValue = (input: Field) => formatToNumber(input.getValue())

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    console.log({
      initial: inputValue(initial),
      monthly: inputValue(monthly),
      interest: inputValue(interest),
      duration: inputValue(duration),
    })
  }

  const handleClean = () => {
    initial.setValue('')
    monthly.setValue('')
    interest.setValue('')
    duration.setValue('')
    submitButton.disabled = true
    cleanButton.disabled = true
  }

  const disabledButtons = (fields: number[]) => {
    console.log(fields)
    submitButton.disabled = fields.some((item) => !item)
    cleanButton.disabled = fields.every((item) => !item)
  }

  const initial = Input({
    prefix: 'R$',
    placeholder: '0,00',
    label: 'Valor inicial do investimento',
    oninput: (event) => {
      event.target.value = maskCurrency(event.target.value)
      const fields = [
        formatToNumber(event.target.value),
        inputValue(monthly),
        inputValue(interest),
        inputValue(duration),
      ]
      disabledButtons(fields)
    },
  })

  const monthly = Input({
    prefix: 'R$',
    placeholder: '0,00',
    label: 'Valor dos aportes mensais',
    oninput: (event) => {
      event.target.value = maskCurrency(event.target.value)
      const fields = [
        inputValue(initial),
        formatToNumber(event.target.value),
        inputValue(interest),
        inputValue(duration),
      ]
      disabledButtons(fields)
    },
  })

  const interest = Input({
    prefix: '%',
    placeholder: '0,00',
    label: 'Taxa de juros anual',
    maxLength: 6,
    oninput: (event) => {
      event.target.value = maskInterest(event.target.value)
      const fields = [
        inputValue(initial),
        inputValue(monthly),
        formatToNumber(event.target.value),
        inputValue(duration),
      ]
      disabledButtons(fields)
    },
  })

  const duration = Input({
    prefix: 'Anos',
    placeholder: '0',
    label: 'Duração do investimento',
    oninput: (event) => {
      event.target.value = maskNumber(event.target.value)
      const fields = [
        inputValue(initial),
        inputValue(monthly),
        inputValue(interest),
        formatToNumber(event.target.value),
      ]
      disabledButtons(fields)
    },
  })

  const fieldsContainer = createElement(
    'div',
    { className: styles.fieldsContainer },
    initial,
    monthly,
    interest,
    duration
  )

  const submitButton = createElement('button', { disabled: true, type: 'submit', onclick: handleSubmit }, 'Calcular')
  const cleanButton = createElement('button', { disabled: true, type: 'reset', onclick: handleClean }, 'Limpar')
  const buttonsContainer = createElement('div', { className: styles.buttonsContainer }, submitButton, cleanButton)

  const title = createElement('h1', null, 'Simulador de Juros Compostos')
  const formContainer = createElement('form', { className: styles.formContainer }, fieldsContainer, buttonsContainer)
  const resultsContainer = createElement('div', { className: styles.resultsContainer })

  return [title, formContainer, resultsContainer]
}
