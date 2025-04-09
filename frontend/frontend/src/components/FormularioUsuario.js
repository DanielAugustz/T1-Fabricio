import React, { useState } from 'react';
import { createUser, updateUser } from '../services/api';

const FormularioUsuario = ({ usuarioParaEditar, aoSucesso }) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: usuarioParaEditar?.nome || '',
    cpf: usuarioParaEditar?.cpf || '',
    telefone: usuarioParaEditar?.telefone || ''
  });
  const [erro, setErro] = useState(null);

  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const lidarComEnvio = async (e) => {
    e.preventDefault();
    try {
      if (usuarioParaEditar) {
        await updateUser(usuarioParaEditar.id, dadosFormulario);
      } else {
        await createUser(dadosFormulario);
      }
      aoSucesso();
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="formulario-usuario">
      <h2>{usuarioParaEditar ? 'Editar Usuário' : 'Criar Novo Usuário'}</h2>
      {erro && <div className="erro">{erro}</div>}
      <form onSubmit={lidarComEnvio}>
        <div className="grupo-formulario">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={dadosFormulario.nome}
            onChange={lidarComMudanca}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={dadosFormulario.cpf}
            onChange={lidarComMudanca}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={dadosFormulario.telefone}
            onChange={lidarComMudanca}
            required
          />
        </div>
        <button type="submit">
          {usuarioParaEditar ? 'Atualizar' : 'Criar'}
        </button>
      </form>
    </div>
  );
};

export default FormularioUsuario;