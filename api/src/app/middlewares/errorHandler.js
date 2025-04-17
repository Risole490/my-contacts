module.exports = (error, req, res, next) => { // Middleware de tratamento de erros. Deve ser o último middleware a ser declarado
    console.log('######## Error Handler ########');
    console.log(error);
    res.sendStatus(500);
}
