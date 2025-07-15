
# MyContacts API

## Visão Geral

MyContacts API é uma API RESTful desenvolvida com Node.js e Express para gerenciar contatos e categorias. Utiliza PostgreSQL como banco de dados e segue boas práticas de organização por domínio (controllers, repositories, middlewares e utils).

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Extensão uuid-ossp para geração de UUIDs
- ESLint

## Como Usar

### Pré-requisitos

- Node.js e npm instalados
- PostgreSQL instalado e em execução
- Docker (opcional, para rodar o PostgreSQL em container)

### Instalação

1. Clone o repositório:
   ```sh
   git clone <repository-url>
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd mycontacts
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

### Configuração

1. Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=mycontacts
   ```

### Banco de Dados

1. Execute o script SQL para criar as tabelas:
   ```sh
   psql -U root -d mycontacts -f src/database/schema.sql
   ```
   Ou, usando Docker:
   ```sh
   docker start
   docker exec -it pg bash
   psql -U root
   \c mycontacts
   \i src/database/schema.sql
   ```

### Executando a API

1. Inicie o servidor:
   ```sh
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3001`.

## Padrões do Projeto

- IDs do banco são UUIDs, validados por `isValidUUID.js`.
- Controllers não possuem SQL; toda lógica de banco está nos repositories.
- Middleware global de erros: `errorHandler.js`.
- CORS habilitado para `http://localhost:3000` via `cors.js`.
- Uso de async/await em toda lógica assíncrona.

## Endpoints

### Contatos

- `GET /contacts`: Lista todos os contatos
- `GET /contacts/:id`: Busca contato por ID
- `POST /contacts`: Cria novo contato
- `PUT /contacts/:id`: Atualiza contato
- `DELETE /contacts/:id`: Remove contato

### Categorias

- `GET /categories`: Lista todas as categorias
- `GET /categories/:id`: Busca categoria por ID
- `POST /categories`: Cria nova categoria
- `PUT /categories/:id`: Atualiza categoria
- `DELETE /categories/:id`: Remove categoria

## Tratamento de Erros

Toda exceção é tratada pelo middleware global [`errorHandler`](src/app/middlewares/errorHandler.js), retornando respostas padronizadas.

## Licença

MIT
