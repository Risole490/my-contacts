// Este arquivo contém a implementação do serviço de contatos.
// Ele é responsável por fazer requisições para a API de contatos.
import delay from "../utils/delay";
import HttpClient from "./utils/HttpClient";
import ContactMapper from "./mappers/ContactMapper";

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);

    return contacts.map(ContactMapper.toDomain); // Mapeia cada contato do formato de persistência para o domínio
  }

  async getContactById(id) {
    await delay(1000); // Simula um atraso para fins de demonstração

    const contact = await this.httpClient.get(`/contacts/${id}`);

    return ContactMapper.toDomain(contact); // Mapeia o contato do formato de persistência para o domínio
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact); // Mapeia o contato do domínio para o formato de persistência

    return this.httpClient.post('/contacts', { body });
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact); // Mapeia o contato do domínio para o formato de persistência

    return this.httpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
