export default class EventManager {
  constructor() {
    this.listeners = {};
  }

  on(e, listener) {
    // Verifica se já existe um array de listeners para o evento 'e'.
    // 'this.listeners' é um objeto onde as chaves são os nomes dos eventos
    // e os valores são arrays de funções (os listeners).
    // Se 'this.listeners[e]' for 'undefined' (o que acontece na primeira vez
    // que um listener é registrado para este evento), a condição será verdadeira.
    if (!this.listeners[e]) {
      // Se não houver um array de listeners para este evento, cria um novo array vazio.
      // Isso garante que 'this.listeners[e]' sempre seja um array antes de tentarmos adicionar.
      this.listeners[e] = [];
    }

    // Adiciona a função 'listener' (o callback) ao array de listeners
    // correspondente ao evento 'e'.
    // Quando o evento 'e' for disparado, todas as funções neste array serão executadas.
    this.listeners[e].push(listener);
  }

  emit(e, payload) {
    // Verifica se não há nenhum listener registrado para o evento 'e'.
    // 'this.listeners[e]' acessa o array de funções (listeners) associado a este evento.
    // Se for 'undefined' (porque ninguém chamou 'on' para este evento),
    // ou se o array estiver vazio, não há nada a fazer.
    if (!this.listeners[e]) {
      // Se não há listeners, simplesmente encerra a execução do método.
      return;
    }

    // Itera sobre cada 'listener' (função de callback) no array de listeners
    // associado ao evento 'e'.
    this.listeners[e].forEach((listener) => {
      // Executa a função 'listener' atual, passando o 'payload' (dados do evento)
      // como argumento.
      // Isso permite que cada função ouvinte reaja ao evento e use os dados enviados.
      listener(payload);
    });
  }
}
const toastEventManager = new EventManager();

toastEventManager.on('addtoast', (payload) => {
  console.log('addtoast listener:', payload);
});

toastEventManager.emit('addtoast', {
  type: 'default',
  text: 'This is a toast message',
});


console.log({toastEventManager});
