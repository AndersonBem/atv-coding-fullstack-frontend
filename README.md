# 🌐 Registro de Clientes - Frontend (PWA)

Aplicação frontend desenvolvida como Progressive Web App (PWA) para gerenciamento de clientes, consumindo uma API REST em Node.js.

## 🚀 Funcionalidades

* Cadastro de clientes
* Edição de clientes
* Exclusão de clientes
* Listagem de clientes
* Busca de cliente por ID
* Mensagens de feedback (sucesso/erro)
* Interface responsiva
* Instalação como aplicativo (PWA)

---

## 🛠️ Tecnologias utilizadas

* HTML5
* CSS3 (customizado)
* JavaScript (Vanilla JS)
* Service Worker
* Web App Manifest

---

## 📂 Estrutura do projeto

```id="0a9k7w"
frontend/
│
├── icons/
├── index.html
├── app.js
├── style.css
├── manifest.json
└── service-worker.js
```

---

## ⚙️ Como executar localmente

### 1. Clonar o repositório

```bash id="vlp5b0"
git clone https://github.com/AndersonBem/atv-coding-fullstack-frontend.git
cd atv-coding-fullstack-frontend
```

### 2. Rodar com servidor local

Você pode usar o Live Server do VS Code ou:

```bash id="bd8kpx"
npx serve .
```

ou abrir com:

```bash id="0w1b6l"
http://127.0.0.1:5500
```

---

## 🔗 Integração com API

A aplicação consome a API backend hospedada em:

👉 https://desafio-app-clientes.onrender.com

Endpoints utilizados:

* `GET /api` → listar clientes
* `GET /api/:id` → buscar cliente
* `POST /api` → criar cliente
* `PUT /api/:id` → atualizar cliente
* `DELETE /api/:id` → excluir cliente

---

## 📱 PWA (Progressive Web App)

A aplicação possui suporte a instalação como aplicativo:

* Manifest configurado
* Ícones em múltiplos tamanhos
* Service Worker para cache offline
* Instalável em dispositivos compatíveis

---

## 📊 Qualidade (Lighthouse)

A aplicação foi otimizada para atingir alta pontuação no Lighthouse:

* ✅ Desempenho
* ✅ Acessibilidade
* ✅ Boas práticas
* ✅ SEO

---

## 📸 Interface

* Layout moderno e responsivo
* Design limpo
* Experiência otimizada para mobile

---

## 🚀 Deploy

Aplicação disponível em:

👉 https://atv-coding-fullstack-frontend.onrender.com

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos.
