import { App } from './app'
import styles from './app.module.scss'
import './globalStyles.scss'

const app = App()

const $container = document.querySelector('#app')
$container?.classList.add(styles.app)
app.forEach((component) => $container?.appendChild(component))
