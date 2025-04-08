-- SQL é a linguagem padrão para acessar e manipular bancos de dados.
-- SQL é uma linguagem declarativa, ou seja, você diz o que quer e o banco de dados se vira para fazer.

-- docker start
-- docker exec -it pg bash
-- psql -U root
-- \l - lista os bancos de dados
-- \c mycontacts - conecta ao banco de dados mycontacts
-- \dt - lista as tabelas


-- Query é um comando SQL que é executado no banco de dados.
CREATE DATABASE mycontacts; -- Cria um banco de dados chamado mycontacts.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Cria uma extensão chamada uuid-ossp. Essa extensão é necessária para gerar UUIDs. IF NOT EXISTS é uma cláusula que só cria a extensão se ela não existir.

CREATE TABLE  IF NOT EXISTS categories ( -- Cria uma tabela chamada categories. Tabelas são como planilhas. Cada linha é uma entrada e cada coluna é um campo.
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(), -- Cria uma coluna chamada id que é do tipo UUID, não pode ser nula, é única e tem um valor padrão.
  name VARCHAR NOT NULL -- Cria uma coluna chamada name que é do tipo VARCHAR (mesmo que String em JS) e não pode ser nula.
);

CREATE TABLE IF NOT EXISTS contacts ( -- Cria uma tabela chamada contacts.
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(), -- Cria uma coluna chamada id que é do tipo UUID, não pode ser nula, é única e tem um valor padrão.
  name VARCHAR NOT NULL, -- Cria uma coluna chamada name que é do tipo VARCHAR (mesmo que String em JS) e não pode ser nula.
  email VARCHAR UNIQUE, -- Cria uma coluna chamada email que é do tipo VARCHAR e é única.
  phone VARCHAR, -- Cria uma coluna chamada phone que é do tipo VARCHAR.
  category_id UUID, -- Cria uma coluna chamada category_id que é do tipo UUID.
  FOREIGN KEY(category_id) REFERENCES categories(id) -- Cria uma chave estrangeira que relaciona a coluna category_id com a coluna id da tabela categories.
);
