// Este arquivo httpClient.js contém a implementação de um cliente HTTP simples.
// Ele é responsável por fazer requisições para a API de contatos.
// Ele utiliza a função fetch para fazer as requisições e retorna os dados em formato JSON.

import delay from "../../utils/delay";

class HttpClient {
  constructor(baseURL) { // Recebe a baseURL como parâmetro
    this.baseURL = baseURL; // Armazena a baseURL
  }

  async get (path) {
    await delay(500);

    const response = await fetch(`${this.baseURL}${path}`);

    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} - ${response.statusText}`);
  }
}

export default HttpClient;
