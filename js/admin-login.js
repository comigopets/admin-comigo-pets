import { auth } from './firebase-config.js';

const form = document.getElementById('login-form');
const errorMsg = document.getElementById('login-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = 'dashboard.html';
  } catch (err) {
    errorMsg.textContent = 'Usuário ou senha inválidos.';
    console.error(err);
  }
});