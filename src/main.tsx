import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'

class BotristaDevTools extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    const mountPoint = document.createElement('div')
    this.shadowRoot!.appendChild(mountPoint)
    createRoot(mountPoint).render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>,
    )
  }
}

customElements.define('botrista-dev-tools', BotristaDevTools)
const botristaDevTools = document.createElement('botrista-dev-tools')
document.body.appendChild(botristaDevTools)

createRoot(document.body.querySelector('#root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)