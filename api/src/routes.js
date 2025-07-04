const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

router.get('/contacts', ContactController.index); // Rota para obter todos os contatos
router.get('/contacts/:id', ContactController.show); // Rota para obter um contato
router.delete('/contacts/:id', ContactController.delete); // Rota para deletar um contato
router.post('/contacts', ContactController.store); // Rota para criar um contato
router.put('/contacts/:id', ContactController.update); // Rota para atualizar um contato
// router.get('/contacts/:id/:email', ContactController.show);  // Podemos ter mais de um parâmetro na rota e criar nossso próprio nome de parâmetro

router.get('/categories', CategoryController.index); // Rota para obter todas as categorias
router.get('/categories/:id', CategoryController.show); // Rota para obter uma categoria
router.delete('/categories/:id', CategoryController.delete); // Rota para deletar uma categoria
router.post('/categories', CategoryController.store); // Rota para criar uma categoria
router.put('/categories/:id', CategoryController.update); // Rota para atualizar uma categoria

module.exports = router;
