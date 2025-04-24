// Este arquivo contém a implementação do serviço de contatos.
// Ele é responsável por fazer requisições para a API de contatos.

import delay from "../utils/delay";

class ContactsService {
  async listContacts(orderBy = 'asc') {
    const response = await fetch(
      `http://localhost:3001/contacts?orderBy=${orderBy}`,
    );

    await delay(500); // Adiciona um atraso de 2 segundos

    return response.json();
  }
}

export default new ContactsService();
