const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.findAll();

    res.json(categories);
  }

  // Error Handler (Middleware express)=> Manipulador de erros

  async show(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.findById(id);

    if(!category) {
      // 404: Not Found
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if(!name) {
      // 400: Bad Request
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    res.status(201).json(category); // 201: Created
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if(!categoryExists) {
      // 404: Not Found
      return res.status(404).json({ error: 'Category not found' });
    }

    if(!name) {
      // 400: Bad Request
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

    await CategoriesRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
