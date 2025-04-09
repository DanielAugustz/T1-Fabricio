from sqlalchemy import create_engine

# Teste de conexão com o banco
URL_TESTE = 'mysql+pymysql://fastapi:*120893@localhost/fastapi_db'

try:
    motor_teste = create_engine(URL_TESTE)
    with motor_teste.connect() as conexao:
        print("Conexão estabelecida com sucesso")
except Exception as erro:
    print(f"Falha na conexão: {erro}")