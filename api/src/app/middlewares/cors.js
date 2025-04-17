module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Permite o acesso de origens diferentes
  next(); // Chama o próximo middleware
};
