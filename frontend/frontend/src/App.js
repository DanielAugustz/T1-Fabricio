import React, { useState } from 'react';
import ListaUsuarios from './components/ListaUsuarios';
import FormularioUsuario from './components/FormularioUsuario';
import './App.css';

function App() {
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [atualizarLista, setAtualizarLista] = useState(false);

  const lidarComEdicao = (usuario) => {
    setUsuarioEditando(usuario);
    setMostrarFormulario(true);
  };

  const lidarComSucesso = () => {
    setMostrarFormulario(false);
    setUsuarioEditando(null);
    setAtualizarLista(prev => !prev);
  };

  return (
    <div className="app">
      <h1>Gerenciamento de Usuários</h1>
      <button onClick={() => {
        setUsuarioEditando(null);
        setMostrarFormulario(true);
      }}>
        Criar Novo Usuário
      </button>

      {mostrarFormulario ? (
        <FormularioUsuario
          usuarioParaEditar={usuarioEditando}
          aoSucesso={lidarComSucesso}
        />
      ) : (
        <ListaUsuarios
          aoEditar={lidarComEdicao}
          key={atualizarLista}
        />
      )}
    </div>
  );
}

export default App;