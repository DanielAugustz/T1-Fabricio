import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import ItemUsuario from './ItemUsuario';

const ListaUsuarios = ({ aoEditar }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const dados = await getUsers();
        setUsuarios(dados);
        setCarregando(false);
      } catch (err) {
        setErro(err.message);
        setCarregando(false);
      }
    };

    buscarUsuarios();
  }, []);

  const lidarComDelecao = async (id) => {
    try {
      await deleteUser(id);
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    } catch (err) {
      setErro(err.message);
    }
  };

  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div>Erro: {erro}</div>;

  return (
    <div className="lista-usuarios">
      <h2>Lista de Usuários</h2>
      {usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado</p>
      ) : (
        <ul>
          {usuarios.map(usuario => (
            <ItemUsuario
              key={usuario.id}
              usuario={usuario}
              aoEditar={aoEditar}
              aoDeletar={lidarComDelecao}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaUsuarios;