const express = require('express');
require('express-async-errors'); // Importa a biblioteca para tratamento de erros assíncronos

const routes = require('./routes'); // Importa as rotas do arquivo routes.js

const app = express();

app.use(express.json()); // Permite o uso de JSON nas requisições
app.use(routes); // Importa as rotas
app.use((error, req, res, next) => { // Middleware de tratamento de erros. Deve ser o último middleware a ser declarado
  console.log('######## Error Handler ########');
  console.log(error);
  res.sendStatus(500);
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
