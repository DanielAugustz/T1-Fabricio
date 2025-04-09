from sqlalchemy import inspect
from database import Base, motor
from modulos import Usuario

# Verifica as tabelas definidas nos modelos
print("Tabelas declaradas nos modelos:", Base.metadata.tables.keys())

# Inspeciona o banco de dados 
verificador = inspect(motor)
print("Tabelas existentes no banco:", verificador.get_table_names())

# Cria todas as tabelas que não existem
Base.metadata.create_all(bind=motor)
print("Criação de tabelas concluída")