import EventManager from "../lib/EventManager";

export const toastEventManager = new EventManager();

export default function toast({ type, text }) {
  // Dispara um evento 'toast' com os dados fornecidos.
  // O 'type' pode ser 'success', 'error', 'info', etc., e 'text' é a mensagem do toast.
  toastEventManager.emit("addtoast", { type, text });
}

// Essa função pode ser chamada em qualquer lugar do aplicativo para disparar um toast
