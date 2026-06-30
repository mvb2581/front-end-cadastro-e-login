import { APP_NAME } from '../../config/constants.js'

const rotas = [
  { href: '/login', label: 'Login' },
  { href: '/cadastro', label: 'Cadastro' },
  { href: '/saiba-mais', label: 'Saiba Mais' },
]

export function Header(rotaAtiva) {
  const header = document.createElement('header')
  header.className = 'sticky-top border-bottom border-secondary border-opacity-25'
  header.style.backgroundColor = '#0a1628'

  const nav = document.createElement('nav')
  nav.className = 'navbar navbar-expand-sm'
  nav.style.backgroundColor = '#0a1628'

  const container = document.createElement('div')
  container.className = 'container'

  const brand = document.createElement('a')
  brand.className = 'navbar-brand d-flex align-items-center gap-2'
  brand.href = '/login'
  brand.style.cursor = 'pointer'

  const icon = document.createElement('span')
  icon.className = 'd-inline-flex align-items-center justify-content-center fw-bold'
  icon.style.cssText = 'width:34px;height:34px;background:linear-gradient(135deg,#c9a84c,#a8882e);border-radius:8px;color:#0a1628;font-size:1rem;letter-spacing:0.5px'
  icon.textContent = 'S'

  const logoText = document.createElement('span')
  logoText.className = 'fw-semibold'
  logoText.style.fontFamily = "'Playfair Display', serif"
  logoText.style.color = '#ffffff'
  logoText.style.fontSize = '1.2rem'
  logoText.innerHTML = `<span style="color:#c9a84c">${APP_NAME}</span>`

  brand.appendChild(icon)
  brand.appendChild(logoText)
  container.appendChild(brand)

  const toggle = document.createElement('button')
  toggle.className = 'navbar-toggler border-0'
  toggle.type = 'button'
  toggle.dataset.bsToggle = 'collapse'
  toggle.dataset.bsTarget = '#navbarNav'
  toggle.innerHTML = '<span class="navbar-toggler-icon"></span>'
  toggle.style.filter = 'invert(1)'
  container.appendChild(toggle)

  const collapse = document.createElement('div')
  collapse.className = 'collapse navbar-collapse'
  collapse.id = 'navbarNav'

  const ul = document.createElement('ul')
  ul.className = 'navbar-nav ms-auto gap-2'

  rotas.forEach(rota => {
    const li = document.createElement('li')
    li.className = 'nav-item'

    const a = document.createElement('a')
    a.className = `nav-link px-3 ${rota.href === rotaAtiva ? 'active' : ''}`
    a.href = rota.href
    a.textContent = rota.label
    a.style.cssText = rota.href === rotaAtiva
      ? 'color:#c9a84c !important;font-weight:600'
      : 'color:#c5ccd6 !important'

    a.addEventListener('click', e => {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('navegar', { detail: rota.href }))
    })

    li.appendChild(a)
    ul.appendChild(li)
  })

  collapse.appendChild(ul)
  container.appendChild(collapse)
  nav.appendChild(container)
  header.appendChild(nav)

  return header
}
