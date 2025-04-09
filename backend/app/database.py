# Configurações do banco de dados
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Configuração da conexão com o MySQL
URL_CONEXAO = 'mysql+pymysql://fastapi:*120893@localhost/fastapi_db'

# Cria o motor de conexão com o banco
motor = create_engine(URL_CONEXAO)

# Configura a fábrica de sessões
SessaoLocal = sessionmaker(autocommit=False, autoflush=False, bind=motor)

# Base para os modelos das tabelas
Base = declarative_base()

# Gerador de sessões para dependências
def obter_sessao():
    sessao = SessaoLocal()
    try:
        yield sessao
    finally:
        sessao.close()