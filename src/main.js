import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'

import { LoginPage } from './pages/LoginPage.js'
import { CadastroPage } from './pages/CadastroPage.js'
import { SaibaMaisPage } from './pages/SaibaMaisPage.js'

const rotas = {
  '/login': LoginPage,
  '/cadastro': CadastroPage,
  '/saiba-mais': SaibaMaisPage,
}

function rotear(caminho) {
  const app = document.getElementById('app')
  app.innerHTML = ''

  const pagina = rotas[caminho]
  if (!pagina) {
    window.dispatchEvent(new CustomEvent('navegar', { detail: '/login' }))
    return
  }

  const el = pagina()

  el.classList.add('page-enter')
  app.appendChild(el)

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

window.addEventListener('navegar', e => {
  const caminho = e.detail
  history.pushState({}, '', caminho)
  rotear(caminho)
})

window.addEventListener('popstate', () => {
  rotear(location.pathname)
})

rotear(location.pathname || '/login')
