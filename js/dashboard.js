import { auth, db } from './firebase-config.js';

const form = document.getElementById('pet-form');
const tableBody = document.querySelector('#pets-table tbody');
const logoutBtn = document.getElementById('logout');

// Garante que apenas usuários logados acessem
auth.onAuthStateChanged(user => {
  if (!user) window.location.href = 'admin.html';
});

// Logout
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  }).catch(err => console.error('Erro ao sair:', err));
});

// Salvar (create/update)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = form['pet-id'].value;
  const data = {
    nome: form.nome.value,
    tipo: form.tipo.value,
    idade: form.idade.value,
    sexo: form.sexo.value,
    raca: form.raca.value,
    vacinado: form.vacinado.value,
    vermifugado: form.vermifugado.value,
    personalidade: form.personalidade.value,
    imagem: form.imagem.value,
    status: form.status.value
  };

  if (id) {
    await db.collection('pets').doc(id).update(data);
  } else {
    await db.collection('pets').add(data);
  }
  form.reset();
});

// Listar em tempo real
db.collection('pets').onSnapshot(snapshot => {
  tableBody.innerHTML = '';
  snapshot.forEach(doc => {
    const pet = doc.data();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${pet.nome}</td>
      <td>${pet.tipo}</td>
      <td>${pet.status}</td>
      <td>
        <button onclick="editarPet('${doc.id}')">Editar</button>
        <button onclick="excluirPet('${doc.id}')">Excluir</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
});

// Editar / Excluir
window.editarPet = async (id) => {
  const docSnap = await db.collection('pets').doc(id).get();
  if (docSnap.exists) {
    const p = docSnap.data();
    form['pet-id'].value = id;
    for (let key in p) if (form[key]) form[key].value = p[key];
  }
};

window.excluirPet = async (id) => {
  if (confirm('Tem certeza que deseja excluir?')) {
    await db.collection('pets').doc(id).delete();
  }

};
