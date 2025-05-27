// Controller de Contatos/ CRUD
const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(req,res) { // Listar todos os contatos
    const { orderBy } = req.query; // Pega o parâmetro da requisição
    const contacts = await ContactsRepository.findAll(orderBy);

    res.json(contacts);
  }

  async show(req, res) { // Obter dados de um contato
    const { id } = req.params;

    // Verifica se o id é um UUID válido
    if(!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const contact = await ContactsRepository.findById(id);

    if(!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    return res.json(contact);
  }

  async store(req, res) { // Criar um novo contato
    const { name, email, phone, category_id } = req.body; // Desestruturação para pegar os dados do corpo da requisição
    // snake_case // camelCase PascalCase // kebab-case

    if(!name) {
      // 400: Bad Request
      return res.status(400).json({ error: 'Name is required' }); // Sempre informar o motivo do erro
    }

    if(category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    if(email) {
      const contactExists = await ContactsRepository.findByEmail(email);
      if(contactExists) {
        return res.status(400).json({ error: 'This email is already in use' });
      }
    }


    const contact = await ContactsRepository.create({
      name,
      email: email || null, // Se não for informado, será null
      phone,
      category_id: category_id || null, // Se não for informado, será null
    });

    res.status(201).json(contact); // 201: Created
  }

  async update(req, res) { // Atualizar um contato
    const { id } = req.params; // Desestruturação para pegar o id da requisição
    const { name, email, phone, category_id } = req.body; // Desestruturação para pegar os dados do corpo da requisição

    if(!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    if(category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    if(!name) { // Se o nome não for informado
      // 400: Bad Request
      return res.status(400).json({ error: 'Name is required' });
    }

    if(email) { // Se o email for informado
      const contactExists = await ContactsRepository.findById(id); // Verifica se o contato existe
      if(!contactExists) { // Se não existir
        // 404: Not Found
        return res.status(404).json({ error: 'Contact not found' });
      }
    }

    const contactByEmail = await ContactsRepository.findByEmail(email); // Verifica se o email já está em uso
    if(contactByEmail && contactByEmail.id !== id) { // Se o email já estiver em uso e não for o mesmo contato
      // 400: Bad Request
      return res.status(400).json({ error: 'This email is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    }); // Atualiza o contato

    res.json(contact); // Retorna o contato atualizado
  }

  async delete(req, res) { // Deletar um contato
    const { id } = req.params; // Desestruturação para pegar o id da requisição

    if(!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    await ContactsRepository.delete(id);
    // 204: No Content. Resposta de sucesso sem conteúdo
    res.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
