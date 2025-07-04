const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../utils/isValidUUID');

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    res.json(categories);
  }

  // Error Handler (Middleware express)=> Manipulador de erros

  async show(req, res) {
    const { id } = req.params;

    // Valida o UUID
    if(!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }

    const category = await CategoriesRepository.findById(id);

    if(!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if(!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    res.status(201).json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if(!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }

    const categoryExists = await CategoriesRepository.findById(id);

    if(!categoryExists) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if(!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const categoryByName = await CategoriesRepository.findByName(name);
    if(categoryByName && categoryByName.id !== id) {
      return res.status(400).json({ error: 'This category name is already in use' });
    }

    const category = await CategoriesRepository.update(id, { name });

    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    if(!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }

    await CategoriesRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
