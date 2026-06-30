import { storage } from '../storage/index.js'
import { STORAGE_KEYS } from '../config/constants.js'

export const auth = {
  listarUsuarios() {
    return storage.get(STORAGE_KEYS.USUARIOS) || []
  },

  salvarUsuarios(usuarios) {
    storage.set(STORAGE_KEYS.USUARIOS, usuarios)
  },

  cadastrar({ nome, email, senha, cargo }) {
    const usuarios = this.listarUsuarios()

    if (usuarios.find(u => u.email === email)) {
      return { erro: 'Este e-mail já está cadastrado.' }
    }

    const novo = { id: crypto.randomUUID(), nome, email, senha, cargo }
    usuarios.push(novo)
    this.salvarUsuarios(usuarios)
    return { sucesso: true, usuario: novo }
  },

  login(email, senha) {
    const usuarios = this.listarUsuarios()
    const usuario = usuarios.find(u => u.email === email && u.senha === senha)

    if (!usuario) {
      return { erro: 'E-mail ou senha inválidos.' }
    }

    storage.set(STORAGE_KEYS.LOGADO, usuario)
    return { sucesso: true, usuario }
  },

  logout() {
    storage.remove(STORAGE_KEYS.LOGADO)
  },

  sessao() {
    return storage.get(STORAGE_KEYS.LOGADO)
  },
}
