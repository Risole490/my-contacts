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

  get(path, options) { // Tiramos o async do post, pois não estamos utilizando o await
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
     });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body, // Passa o body como parâmetro
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    await delay(1000);

    // Uma forma de passar o header como objeto.
    const headers = new Headers();

    if(options.body) { // Verifica se o body foi passado
      headers.append('Content-Type', 'application/json'); // Adiciona o header Content-Type
    }

    if(options.headers) { // Verifica se o header foi passado
      // Object.keys(options.headers).forEach((name) => {
      //   headers.append(name, options.headers[name]); // Adiciona o header
      // });

      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value); // Adiciona o header
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method, // Método da requisição (GET, POST, etc)
      body: JSON.stringify(options.body), // Converte o objeto para JSON
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('content-type'); // Obtém o tipo de conteúdo da resposta
    if(contentType?.includes('application/json')) { // Verifica se o tipo de conteúdo é JSON. O uso do optional chaining (?.) evita erros caso contentType seja null ou undefined, como o método DELETE.
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
