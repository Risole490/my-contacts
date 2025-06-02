// Responsável por gerenciar eventos personalizados

export default class EventManager {
  constructor() {
    this.listeners = {};
  }

  on(e, listener) {
    if(!this.listeners[e]) {
      this.listeners[e] = [];
    }

    this.listeners[e].push(listener);
  }

  emit(e, payload) {
    if(!this.listeners[e]) {
      return;
    }

    this.listeners[e].forEach((listener) => {
      listener(payload);
    });
  }
}

const toastEventManager = new EventManager();

toastEventManager.on('addtoast', (payload) => {
  console.log('addtoast listener', payload);
});


toastEventManager.emit('addtoast', { type: 'default', text: 'Hello, World!' });

console.log(toastEventManager);

