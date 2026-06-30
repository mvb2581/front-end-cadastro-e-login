# SGR — Gestão de Receitas Empresariais

Sistema web para gestão de receitas empresariais, desenvolvido como projeto
de conclusão de curso.

## Funcionalidades

- **Login** — Autenticação de usuários com armazenamento local
- **Cadastro** — Registro de novos usuários com seleção de cargo
- **Saiba Mais** — Página institucional com a história e valores da empresa

## Estrutura do Projeto

src/
├── components/           # (Miguel)
│   ├── layout/
│   │   └── Header.js     # Barra de navegação superior
│   └── shared/
│       └── Alert.js      # Componente de alerta reutilizável
├── config/               # (Miguel)
│   └── constants.js      # Constantes e configurações
├── pages/                # (Miguel)
│   ├── LoginPage.js      # Página de login
│   ├── CadastroPage.js   # Página de cadastro
│   └── SaibaMaisPage.js  # Página institucional
├── services/             # (Akila)
│   └── auth.js           # Lógica de autenticação
├── storage/              # (Akila)
│   └── index.js          # Abstração do localStorage
├── main.js               # (Akila) — Roteador e ponto de entrada
└── style.css             # (Akila) — Estilos globais

## Tecnologias

- **Vite** — Build tool
- **Bootstrap 5** — Framework CSS
- **localStorage** — Persistência de dados
- **Google Fonts** — Inter e Playfair Display

## Como Rodar

```bash
npm install
npm run dev
Autores
- Miguel — Components, Config, Pages
- Akila — Services, Storage, Main.js, Style.css
