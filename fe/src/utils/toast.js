export default function toast({ type, text }) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type, // Tipo do toast (default, danger, success)
      text, // Texto do toast
    },
  });

  document.dispatchEvent(event); // Dispara o evento personalizado
}

// Essa função pode ser chamada em qualquer lugar do aplicativo para disparar um toast
