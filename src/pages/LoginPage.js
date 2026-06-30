import { Header } from '../components/layout/Header.js'
import { mostrarAlerta } from '../components/shared/Alert.js'
import { auth } from '../services/auth.js'

export function LoginPage() {
  const page = document.createElement('div')

  const header = Header('/login')
  page.appendChild(header)

  const main = document.createElement('main')
  main.className = 'd-flex align-items-center'
  main.style.cssText = 'min-height:calc(100vh - 76px);background:linear-gradient(135deg,#0a1628,#0d1e3a,#0a1628)'

  const container = document.createElement('div')
  container.className = 'container py-5'

  const row = document.createElement('div')
  row.className = 'row justify-content-center'

  const col = document.createElement('div')
  col.className = 'col-12 col-md-6 col-lg-5'

  const card = document.createElement('div')
  card.className = 'card border-secondary border-opacity-25 shadow-lg'
  card.style.backgroundColor = '#0f1b33'

  const cardBody = document.createElement('div')
  cardBody.className = 'card-body p-4 p-md-5'

  const iconDiv = document.createElement('div')
  iconDiv.className = 'text-center mb-3'
  const iconCircle = document.createElement('span')
  iconCircle.className = 'icon-circle'
  iconCircle.textContent = 'A'
  iconDiv.appendChild(iconCircle)

  const title = document.createElement('h1')
  title.className = 'text-center fw-bold mb-1'
  title.style.cssText = "font-family:'Playfair Display',serif;color:#ffffff;font-size:1.75rem"
  title.textContent = 'Acessar Sistema'

  const divider = document.createElement('div')
  divider.className = 'divider-gold my-3'

  const subtitle = document.createElement('p')
  subtitle.className = 'text-center text-secondary mb-4'
  subtitle.textContent = 'Insira suas credenciais para continuar'

  const alert = document.createElement('div')
  alert.className = 'alert d-none'
  alert.id = 'loginAlert'

  const form = document.createElement('form')
  form.id = 'loginForm'
  form.noValidate = true

  const emailGroup = document.createElement('div')
  emailGroup.className = 'mb-3'
  emailGroup.innerHTML = `
    <label for="loginEmail" class="form-label text-uppercase small fw-semibold text-secondary">E-mail</label>
    <input type="email" class="form-control form-control-lg bg-dark border-secondary text-light" id="loginEmail" placeholder="seu@email.com" required>
  `

  const passGroup = document.createElement('div')
  passGroup.className = 'mb-4'
  passGroup.innerHTML = `
    <label for="loginSenha" class="form-label text-uppercase small fw-semibold text-secondary">Senha</label>
    <input type="password" class="form-control form-control-lg bg-dark border-secondary text-light" id="loginSenha" placeholder="senha" required minlength="6">
  `

  const btn = document.createElement('button')
  btn.type = 'submit'
  btn.className = 'btn btn-lg w-100 border-0 fw-semibold text-uppercase'
  btn.style.cssText = 'background:linear-gradient(135deg,#c9a84c,#a8882e);color:#0a1628;letter-spacing:0.5px'
  btn.textContent = 'Entrar'

  const footer = document.createElement('div')
  footer.className = 'text-center mt-4 pt-4 border-top border-secondary border-opacity-25'
  footer.innerHTML = '<p class="text-secondary small mb-0">Ainda não tem conta? <a href="/cadastro" class="fw-semibold text-decoration-none" style="color:#c9a84c">Cadastre-se</a></p>'

  form.appendChild(emailGroup)
  form.appendChild(passGroup)
  form.appendChild(btn)

  cardBody.appendChild(iconDiv)
  cardBody.appendChild(title)
  cardBody.appendChild(divider)
  cardBody.appendChild(subtitle)
  cardBody.appendChild(alert)
  cardBody.appendChild(form)
  cardBody.appendChild(footer)
  card.appendChild(cardBody)
  col.appendChild(card)
  row.appendChild(col)
  container.appendChild(row)
  main.appendChild(container)
  page.appendChild(main)

  form.addEventListener('submit', e => {
    e.preventDefault()
    const email = document.getElementById('loginEmail').value
    const senha = document.getElementById('loginSenha').value
    const result = auth.login(email, senha)

    if (result.erro) {
      mostrarAlerta(alert, 'erro', result.erro)
    } else {
      mostrarAlerta(alert, 'sucesso', `Bem-vindo, ${result.usuario.nome}!`)
      setTimeout(() => window.dispatchEvent(new CustomEvent('navegar', { detail: '/saiba-mais' })), 1000)
    }
  })

  cardBody.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('navegar', { detail: a.getAttribute('href') }))
    })
  })

  return page
}
