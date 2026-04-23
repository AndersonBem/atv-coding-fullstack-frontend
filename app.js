const API_URL = 'https://desafio-app-clientes.onrender.com/api';

const form = document.getElementById('cliente-form');
const clienteId = document.getElementById('cliente-id');
const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone');
const email = document.getElementById('email');
const clientesList = document.getElementById('clientes-list');
const message = document.getElementById('message');
const cancelEdit = document.getElementById('cancel-edit');
const formTitle = document.getElementById('form-title');
const reloadBtn = document.getElementById('reload-btn');
const searchId = document.getElementById('search-id');
const searchBtn = document.getElementById('search-btn');
const clearSearchBtn = document.getElementById('clear-search-btn');
const searchResult = document.getElementById('search-result');

function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = isError ? 'text-danger mt-3 mb-0' : 'text-success mt-3 mb-0';
}

function clearForm() {
  form.reset();
  clienteId.value = '';
  formTitle.textContent = 'Novo cliente';
  cancelEdit.classList.add('hidden');
}

function renderClienteCard(cliente) {
  return `
    <div class="entry-item">
      <h3>${cliente.nome}</h3>
      <p><strong>Telefone:</strong> ${cliente.telefone}</p>
      <p><strong>E-mail:</strong> ${cliente.email}</p>
      <p><strong>ID:</strong> ${cliente._id}</p>
      <div class="entry-buttons">
        <button onclick="editCliente('${cliente._id}')">Editar</button>
        <button onclick="deleteCliente('${cliente._id}')">Excluir</button>
      </div>
    </div>
  `;
}

async function loadClientes() {
  try {
    const response = await fetch(API_URL);
    const clientes = await response.json();

    if (!response.ok) {
      throw new Error('Erro ao carregar clientes.');
    }

    if (!clientes.length) {
      clientesList.innerHTML = '<p>Nenhum cliente encontrado.</p>';
      return;
    }

    clientesList.innerHTML = clientes.map(renderClienteCard).join('');
  } catch (error) {
    clientesList.innerHTML = '<p>Não foi possível carregar os clientes.</p>';
    showMessage(error.message, true);
  }
}

async function saveCliente(data) {
  const id = clienteId.value;
  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Erro ao salvar cliente.');
  }

  return result;
}

window.editCliente = async function (id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const cliente = await response.json();

    if (!response.ok) {
      throw new Error(cliente.message || 'Cliente não encontrado.');
    }

    clienteId.value = cliente._id;
    nome.value = cliente.nome;
    telefone.value = cliente.telefone;
    email.value = cliente.email;

    formTitle.textContent = 'Editar cliente';
    cancelEdit.classList.remove('hidden');
    showMessage('Editando cliente.');
  } catch (error) {
    showMessage(error.message, true);
  }
};

window.deleteCliente = async function (id) {
  if (!confirm('Deseja excluir este cliente?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erro ao excluir cliente.');
    }

    showMessage('Cliente excluído com sucesso.');
    loadClientes();
  } catch (error) {
    showMessage(error.message, true);
  }
};

async function buscarClientePorId() {
  const id = searchId.value.trim();

  if (!id) {
    searchResult.innerHTML = '<p class="text-danger">Digite um ID para pesquisar.</p>';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const cliente = await response.json();

    if (!response.ok) {
      throw new Error(cliente.message || 'Cliente não encontrado.');
    }

    searchResult.innerHTML = renderClienteCard(cliente);
  } catch (error) {
    searchResult.innerHTML = `<p class="text-danger">${error.message}</p>`;
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    nome: nome.value.trim(),
    telefone: telefone.value.trim(),
    email: email.value.trim()
  };

  try {
    await saveCliente(data);
    showMessage(clienteId.value ? 'Cliente atualizado com sucesso.' : 'Cliente cadastrado com sucesso.');
    clearForm();
    loadClientes();
  } catch (error) {
    showMessage(error.message, true);
  }
});

cancelEdit.addEventListener('click', () => {
  clearForm();
  showMessage('Edição cancelada.');
});

reloadBtn.addEventListener('click', loadClientes);
searchBtn.addEventListener('click', buscarClientePorId);

clearSearchBtn.addEventListener('click', () => {
  searchId.value = '';
  searchResult.innerHTML = '';
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
      console.log('Service Worker registrado com sucesso.');
    } catch (error) {
      console.log('Erro ao registrar Service Worker:', error);
    }
  });
}

const installBtn = document.getElementById('install-btn');
let deferredPrompt = null;

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // mostra em navegadores compatíveis, exceto iOS
  if (!isIOS() && installBtn) {
    installBtn.classList.remove('hidden');
  }
});

installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;

  if (choiceResult.outcome === 'accepted') {
    showMessage('Instalação iniciada com sucesso.');
  } else {
    showMessage('Instalação cancelada.');
  }

  deferredPrompt = null;
  installBtn.classList.add('hidden');
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  installBtn?.classList.add('hidden');
});

loadClientes();