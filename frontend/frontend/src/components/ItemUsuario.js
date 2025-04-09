import React from 'react';

const ItemUsuario = ({ usuario, aoEditar, aoDeletar }) => {
  return (
    <li className="item-usuario">
      <div className="info-usuario">
        <span><strong>Nome:</strong> {usuario.nome}</span>
        <span><strong>CPF:</strong> {usuario.cpf}</span>
        <span><strong>Telefone:</strong> {usuario.telefone}</span>
      </div>
      <div className="acoes-usuario">
        <button onClick={() => aoEditar(usuario)}>Editar</button>
        <button onClick={() => aoDeletar(usuario.id)}>Deletar</button>
      </div>
    </li>
  );
};

export default ItemUsuario;