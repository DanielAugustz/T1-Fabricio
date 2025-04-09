-- Cria o banco de dados (se não existir)
CREATE DATABASE fastapi_db;

-- Cria usuário 'fastapi' com senha '*120893' (troque em produção!)
CREATE USER 'fastapi'@'localhost' IDENTIFIED BY '*120893';

-- Dá todas permissões ao usuário no banco fastapi_db
GRANT ALL PRIVILEGES ON fastapi_db.* TO 'fastapi'@'localhost';

-- Atualiza permissões
FLUSH PRIVILEGES;

-- Seleciona o banco para uso
USE fastapi_db;

-- Mostra tabelas (vazio no início)
SHOW TABLES;
