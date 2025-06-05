export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }
  // Listeners são funções que ficam "ouvindo" eventos específicos para acontecer.
  // Quando o evento acontece, todas as funções registradas para aquele evento são chamadas.
  // O método 'on' é usado para registrar essas funções (listeners) para um evento específico.
  // O método 'emit' é usado para disparar o evento, fazendo com que todas as funções registradas sejam executadas.
  // O método 'removeListener' é usado para remover uma função específica de um evento.
  // 'e' é o nome do evento (uma string) e 'listener' é a função que será chamada quando o evento ocorrer.


  on(e, listener) {
    // Verifica se já existe um array de listeners para o evento 'e'.
    // 'this.listeners' é um objeto onde as chaves são os nomes dos eventos
    // e os valores são arrays de funções (os listeners).
    // Se 'this.listeners[e]' for 'undefined' (o que acontece na primeira vez
    // que um listener é registrado para este evento), a condição será verdadeira.

    if (!this.listeners.has(e)) {
      // Se não houver um array de listeners para o evento 'e', cria um novo array vazio.
      // Isso garante que 'this.listeners[e]' sempre seja um array antes de tentarmos adicionar.

      this.listeners.set(e, []);
      // Usamos 'set' para adicionar o evento 'e' com um array vazio como valor.
    }

    // Adiciona a função 'listener' (o callback) ao array de listeners
    // correspondente ao evento 'e'.
    // Quando o evento 'e' for disparado, todas as funções neste array serão executadas.
    // Usamos 'get' para acessar o array de listeners do evento 'e' e 'push' para adicionar o listener.
    this.listeners.get(e).push(listener);
  }

  emit(e, payload) {
    // Verifica se não há nenhum listener registrado para o evento 'e'.
    // 'this.listeners[e]' acessa o array de funções (listeners) associado a este evento.
    // Se for 'undefined' (porque ninguém chamou 'on' para este evento),
    // ou se o array estiver vazio, não há nada a fazer.

    if (!this.listeners.has(e)) {
      // Se não há listeners, simplesmente encerra a execução do método.
      return;
    }

    // Itera sobre cada 'listener' (função de callback) no array de listeners
    // associado ao evento 'e'.
    this.listeners.get(e).forEach((listener) => {
      // Executa a função 'listener' atual, passando o 'payload' (dados do evento)
      // como argumento.
      // Isso permite que cada função ouvinte reaja ao evento e use os dados enviados.
      listener(payload);
    });
  }

  removeListener(e, listenerToRemove) {
    const listeners = this.listeners.get(e);

    // Verifica se há listeners registrados para o evento 'e'.
    if (!listeners) {
      // Se não houver listeners, não há nada a remover, então encerra a execução.
      return;
    }

    // Filtra o array de listeners para remover a função 'listener' especificada.
    // 'listenerToRemove' é a função que queremos remover do array de listeners.
    // O método 'filter' cria um novo array contendo todos os listeners que não são iguais a 'listenerToRemove'.
    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);

    // Atualiza o array de listeners para o evento 'e' com o novo array filtrado.
    this.listeners.set(e, filteredListeners);
  }
}
