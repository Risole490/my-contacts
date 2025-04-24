// Este arquivo httpClient.js contém a implementação de um cliente HTTP simples.
// Ele é responsável por fazer requisições para a API de contatos.
// Ele utiliza a função fetch para fazer as requisições e retorna os dados em formato JSON.

import delay from "../../utils/delay";

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get (path) {
    const response = await fetch(`${this.baseURL}${path}`);

    await delay(500); // Adiciona um atraso de 2 segundos

    return response.json();
  }
}

export default HttpClient;
