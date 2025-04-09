// api.js
const URL_API = 'http://localhost:8000';

export const getUsers = async () => {
  const resposta = await fetch(`${URL_API}/usuarios/`);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar usuários');
  }
  return resposta.json();
};

export const createUser = async (dadosUsuario) => {
  const resposta = await fetch(`${URL_API}/usuarios/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosUsuario),
  });
  if (!resposta.ok) {
    throw new Error('Erro ao criar usuário');
  }
  return resposta.json();
};

export const updateUser = async (id, dadosUsuario) => {
  const resposta = await fetch(`${URL_API}/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosUsuario),
  });
  if (!resposta.ok) {
    throw new Error('Erro ao atualizar usuário');
  }
  return resposta.json();
};

export const deleteUser = async (id) => {
  const resposta = await fetch(`${URL_API}/usuarios/${id}`, {
    method: 'DELETE',
  });
  if (!resposta.ok) {
    throw new Error('Erro ao deletar usuário');
  }
  return resposta.json();
};