module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Permite o acesso de origens diferentes
  res.setHeader('Access-Control-Allow-Methods', '*'); // Permite os métodos HTTP
  res.setHeader('Access-Control-Allow-Headers', '*'); // Permite os cabeçalhos HTTP
  res.setHeader('Access-Control-Max-Age', 86400); // Tempo em segundos que o navegador pode armazenar as informações de CORS
  next(); // Chama o próximo middleware
};
