from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import obter_sessao, Base
from modulos import Usuario
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de validação
class UsuarioCriacao(BaseModel):
    nome: str
    cpf: str
    telefone: str

class UsuarioAtualizacao(BaseModel):
    nome: str | None = None
    cpf: str | None = None
    telefone: str | None = None

# Rotas da API
@app.post("/usuarios/")
def criar_usuario(usuario: UsuarioCriacao, sessao: Session = Depends(obter_sessao)):
    novo_usuario = Usuario(
        nome=usuario.nome,
        cpf=usuario.cpf,
        telefone=usuario.telefone
    )
    sessao.add(novo_usuario)
    sessao.commit()
    sessao.refresh(novo_usuario)
    return novo_usuario

@app.get("/usuarios/")
def listar_usuarios(sessao: Session = Depends(obter_sessao)):
    return sessao.query(Usuario).all()

@app.get("/usuarios/{usuario_id}")
def obter_usuario(usuario_id: int, sessao: Session = Depends(obter_sessao)):
    usuario = sessao.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@app.put("/usuarios/{usuario_id}")
def atualizar_usuario(
    usuario_id: int,
    dados: UsuarioAtualizacao,
    sessao: Session = Depends(obter_sessao)
):
    usuario = sessao.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if dados.nome is not None:
        usuario.nome = dados.nome
    if dados.cpf is not None:
        usuario.cpf = dados.cpf
    if dados.telefone is not None:
        usuario.telefone = dados.telefone
    
    sessao.commit()
    sessao.refresh(usuario)
    return usuario

@app.delete("/usuarios/{usuario_id}")
def remover_usuario(usuario_id: int, sessao: Session = Depends(obter_sessao)):
    usuario = sessao.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    sessao.delete(usuario)
    sessao.commit()
    return {"mensagem": "Usuário removido com sucesso"}