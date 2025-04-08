const db = require('../../database'); // Importa o arquivo de configuração do banco de dados. O arquivo index.js dentro da pasta database é importado por padrão

class ContactsRepository { //
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'; // Verifica se a ordenação é decrescente ou crescente

    const rows = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      /*
        Seleciona todos os campos da tabela contacts.
        Seleciona a coluna name da tabela categories e a trás como category_name
      */

      FROM contacts /* Define que a tabela principal é a contacts. Os dados serão extraídos dela */

      LEFT JOIN categories ON categories.id = contacts.category_id
      /*
        Todos os registros da tabela contacts serão retornados por conta do join à esquerda.
        A junção acontece comparando o campo id da tabela categories com o campo category_id da tabela contacts. Ou seja, cada contato pode estar vinculado a uma categoria.
        Se um contato não tiver categoria, category_name será NULL.
      */

      ORDER by contacts.name ${direction}
    `); // Busca todos os contatos no banco de dados
    return rows; // Retorna os contatos encontrados
  };

  async findById(id) {
    const [row] = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1
      `, [id]); // Busca todos os contatos no banco de dados

    return row; // Retorna os contatos encontrados
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]); // Busca todos os contatos no banco de dados

    return row; // Retorna os contatos encontrados
  }

   async create({ name, email, phone, category_id }) { // Recebe os dados do contato como um objeto
    // Importante dar um tratamento para evitar SQL Injection

    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `, [name, email, phone, category_id]);

    return row; // Retorna o contato criado
  } // $1 é o name, $2 é o email, $3 é o phone e $4 é o category_id.

  async update(id, {
      name, email, phone, category_id
    }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ContactsRepository(); // Exporta uma instância da classe ContactsRepository
