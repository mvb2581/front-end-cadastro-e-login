import { Header } from '../components/layout/Header.js'
import { mostrarAlerta } from '../components/shared/Alert.js'
import { CARGOS } from '../config/constants.js'
import { auth } from '../services/auth.js'

export function CadastroPage() {
  const page = document.createElement('div')

  const header = Header('/cadastro')
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
  iconCircle.textContent = 'C'
  iconDiv.appendChild(iconCircle)

  const title = document.createElement('h1')
  title.className = 'text-center fw-bold mb-1'
  title.style.cssText = "font-family:'Playfair Display',serif;color:#ffffff;font-size:1.75rem"
  title.textContent = 'Criar Conta'

  const divider = document.createElement('div')
  divider.className = 'divider-gold my-3'

  const subtitle = document.createElement('p')
  subtitle.className = 'text-center text-secondary mb-4'
  subtitle.textContent = 'Preencha os dados para se registrar'

  const alert = document.createElement('div')
  alert.className = 'alert d-none'
  alert.id = 'cadastroAlert'

  const form = document.createElement('form')
  form.id = 'cadastroForm'
  form.noValidate = true

  const fields = [
    { label: 'Nome completo', id: 'cadNome', type: 'text', placeholder: 'Seu nome' },
    { label: 'E-mail', id: 'cadEmail', type: 'email', placeholder: 'seu@email.com' },
    { label: 'Senha', id: 'cadSenha', type: 'password', placeholder: 'Crie uma senha segura' },
  ]

  fields.forEach(f => {
    const group = document.createElement('div')
    group.className = 'mb-3'
    group.innerHTML = `
      <label for="${f.id}" class="form-label text-uppercase small fw-semibold text-secondary">${f.label}</label>
      <input type="${f.type}" class="form-control form-control-lg bg-dark border-secondary text-light" id="${f.id}" placeholder="${f.placeholder}" required ${f.type === 'password' ? 'minlength="6"' : ''}>
    `
    form.appendChild(group)
  })

  const cargoGroup = document.createElement('div')
  cargoGroup.className = 'mb-4'
  cargoGroup.innerHTML = `
    <label for="cadCargo" class="form-label text-uppercase small fw-semibold text-secondary">Cargo</label>
    <select class="form-select form-select-lg bg-dark border-secondary text-light" id="cadCargo" required>
      <option value="" disabled selected>Selecione seu cargo</option>
      ${CARGOS.map(c => `<option value="${c.value}">${c.label}</option>`).join('')}
    </select>
  `
  form.appendChild(cargoGroup)

  const btn = document.createElement('button')
  btn.type = 'submit'
  btn.className = 'btn btn-lg w-100 border-0 fw-semibold text-uppercase'
  btn.style.cssText = 'background:linear-gradient(135deg,#c9a84c,#a8882e);color:#0a1628;letter-spacing:0.5px'
  btn.textContent = 'Cadastrar'

  const footer = document.createElement('div')
  footer.className = 'text-center mt-4 pt-4 border-top border-secondary border-opacity-25'
  footer.innerHTML = '<p class="text-secondary small mb-0">Já possui conta? <a href="/login" class="fw-semibold text-decoration-none" style="color:#c9a84c">Faça login</a></p>'

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
    const nome = document.getElementById('cadNome').value
    const email = document.getElementById('cadEmail').value
    const senha = document.getElementById('cadSenha').value
    const cargo = document.getElementById('cadCargo').value

    const result = await auth.cadastrar({ nome, email, senha, cargo })

    if (result.erro) {
      mostrarAlerta(alert, 'erro', result.erro)
    } else {
      mostrarAlerta(alert, 'sucesso', `Conta criada! Bem-vindo, ${nome}.`)
      form.reset()
      setTimeout(() => window.dispatchEvent(new CustomEvent('navegar', { detail: '/login' })), 1200)
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
