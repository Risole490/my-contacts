// Este arquivo httpClient.js contém a implementação de um cliente HTTP simples.
// Ele é responsável por fazer requisições para a API de contatos.
// Ele utiliza a função fetch para fazer as requisições e retorna os dados em formato JSON.

import delay from "../../utils/delay"; // A função delay é utilizada para simular um atraso nas requisições, o que pode ser útil para testes.
import APIError from "../../errors/APIError"; // A classe APIError é utilizada para tratar erros de API de forma mais específica.

// A classe HttpClient é responsável por fazer requisições HTTP para uma API.
class HttpClient {
  constructor(baseURL) { // Recebe a baseURL como parâmetro
    this.baseURL = baseURL; // Armazena a baseURL
  }

  async get (path) {
    await delay(500);

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;
    const contentType = response.headers.get('content-type'); // Obtém o tipo de conteúdo da resposta
    if(contentType.includes('application/json')) { // Verifica se o tipo de conteúdo é JSON
      body = await response.json();
    }

    if(response.ok) { // Verifica se a resposta foi bem sucedida
      return body; // Retorna o corpo da resposta
    }

    // Optional chaining
    throw new APIError(response, body); // Lança um erro se a resposta não foi bem sucedida

  }
}

export default HttpClient;
