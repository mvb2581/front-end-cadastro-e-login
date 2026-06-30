export function Alert({ tipo, mensagem }) {
  const wrapper = document.createElement('div')
  wrapper.className = `alert alert-${tipo === 'erro' ? 'danger' : 'success'} d-none`
  wrapper.textContent = mensagem || ''
  return wrapper
}

export function mostrarAlerta(el, tipo, mensagem) {
  el.className = `alert alert-${tipo === 'erro' ? 'danger' : 'success'}`
  el.textContent = mensagem
}

export function esconderAlerta(el) {
  el.className = 'alert d-none'
  el.textContent = ''
}
