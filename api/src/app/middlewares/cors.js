module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Permite o acesso de origens diferentes
  res.setHeader('Access-Control-Allow-Methods', '*'); // Permite os métodos HTTP
  res.setHeader('Access-Control-Allow-Headers', '*'); // Permite os cabeçalhos HTTP
  next(); // Chama o próximo middleware
};
