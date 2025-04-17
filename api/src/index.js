const express = require('express');
require('express-async-errors'); // Importa a biblioteca para tratamento de erros assíncronos

const routes = require('./routes'); // Importa as rotas do arquivo routes.js
const cors = require('./app/middlewares/cors'); // Importa o middleware de CORS
const errorHandler = require('./app/middlewares/errorHandler'); // Importa o middleware de tratamento de erros

const app = express();

app.use(express.json()); // Permite o uso de JSON nas requisições(bodyParser)
app.use(cors); // Middleware de CORS
app.use(routes); // Importa as rotas
app.use(errorHandler); // Middleware de tratamento de erros

app.listen(3001, () => console.log('Server started at http://localhost:3001')); // Inicia o servidor na porta 3001
