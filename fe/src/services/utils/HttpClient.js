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

  get(path) { // Tiramos o async do post, pois não estamos utilizando o await
    return this.makeRequest(path, { method: 'GET' });
  }

  post(path, body) {
    return this.makeRequest(path, {
      method: 'POST',
      body,
    });
  }

  async makeRequest(path, options) {
    await delay(500);

    // Uma forma de passar o header como objeto.
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method, // Método da requisição (GET, POST, etc)
      body: JSON.stringify(options.body), // Converte o objeto para JSON
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('content-type'); // Obtém o tipo de conteúdo da resposta
    if(contentType.includes('application/json')) { // Verifica se o tipo de conteúdo é JSON
      responseBody = await response.json();
    }

    if(response.ok) { // Verifica se a resposta foi bem sucedida
      return responseBody; // Retorna o corpo da resposta
    }

    // Optional chaining
    throw new APIError(response, responseBody); // Lança um erro se a resposta não foi bem sucedida
  }
}

export default HttpClient;
