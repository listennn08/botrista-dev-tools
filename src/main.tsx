import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

class BotristaDevTools extends HTMLElement {
  private cssLink: string

  constructor(cssLink: string) {
    super()
    this.attachShadow({ mode: 'open' })
    this.cssLink = cssLink
  }

  connectedCallback() {
    const mountPoint = document.createElement('div')
    const css = document.createElement('link')
    css.href = this.cssLink
    css.rel = 'stylesheet'
    this.shadowRoot!.appendChild(css)
    this.shadowRoot!.appendChild(mountPoint)
    createRoot(mountPoint).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}

customElements.define('botrista-dev-tools', BotristaDevTools)

