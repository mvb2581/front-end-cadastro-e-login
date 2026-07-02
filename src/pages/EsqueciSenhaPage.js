import { Header } from '../components/layout/Header.js'
import { mostrarAlerta } from '../components/shared/Alert.js'
import { auth } from '../services/auth.js'

export function EsqueciSenhaPage() {
  const page = document.createElement('div')

  const header = Header('/esqueci-senha')
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
  iconCircle.textContent = '?'
  iconDiv.appendChild(iconCircle)

  const title = document.createElement('h1')
  title.className = 'text-center fw-bold mb-1'
  title.style.cssText = "font-family:'Playfair Display',serif;color:#ffffff;font-size:1.75rem"
  title.textContent = 'Recuperar Senha'

  const divider = document.createElement('div')
  divider.className = 'divider-gold my-3'

  const subtitle = document.createElement('p')
  subtitle.className = 'text-center text-secondary mb-4'
  subtitle.textContent = 'Insira seu e-mail para receber o link de redefinição'

  const alert = document.createElement('div')
  alert.className = 'alert d-none'
  alert.id = 'resetAlert'

  const form = document.createElement('form')
  form.id = 'resetForm'
  form.noValidate = true

  const emailGroup = document.createElement('div')
  emailGroup.className = 'mb-3'
  emailGroup.innerHTML = `
    <label for="resetEmail" class="form-label text-uppercase small fw-semibold text-secondary">E-mail</label>
    <input type="email" class="form-control form-control-lg bg-dark border-secondary text-light" id="resetEmail" placeholder="seu@email.com" required>
  `

  const btn = document.createElement('button')
  btn.type = 'submit'
  btn.className = 'btn btn-lg w-100 border-0 fw-semibold text-uppercase'
  btn.style.cssText = 'background:linear-gradient(135deg,#c9a84c,#a8882e);color:#0a1628;letter-spacing:0.5px'
  btn.textContent = 'Enviar Link'

  const footer = document.createElement('div')
  footer.className = 'text-center mt-4 pt-4 border-top border-secondary border-opacity-25'
  footer.innerHTML = '<p class="text-secondary small mb-0"><a href="/login" class="fw-semibold text-decoration-none" style="color:#c9a84c">Voltar ao login</a></p>'

  form.appendChild(emailGroup)
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

  form.addEventListener('submit', async e => {
    e.preventDefault()
    const email = document.getElementById('resetEmail').value

    await auth.gerarTokenReset(email)

    mostrarAlerta(alert, 'sucesso', 'Se o e-mail informado existir em nossa base, você receberá um link de redefinição de senha.')
  })

  cardBody.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('navegar', { detail: a.getAttribute('href') }))
    })
  })

  return page
}
