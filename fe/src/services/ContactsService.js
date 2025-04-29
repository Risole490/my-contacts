// Este arquivo contém a implementação do serviço de contatos.
// Ele é responsável por fazer requisições para a API de contatos.
import HttpClient from "./utils/HttpClient";

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts/deb22cc4-bc46-4472-95fb-ec02f3971ef6?orderBy=${orderBy}`);
  }
}

export default new ContactsService();
