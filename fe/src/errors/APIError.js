
export default class APIError extends Error { // Classe APIError que herda todas as propriedades de Error
  constructor(response, body) { // Construtor que recebe uma mensagem de erro
    super(); // Chama o construtor da classe pai (Error)

    this.name = 'APIError'; // Define o nome do erro como 'APIError'
    this.response = response; // Armazena a resposta da requisição
    this.body = body; // Armazena o corpo da resposta
    this.message = (body?.error || `${response.status} - ${response.statusText}`); // Define a mensagem de erro como o corpo da resposta ou o status e statusText da resposta
  }
}
