import { useState, useEffect } from "react";
import { Container } from "./styles";

import ToastMessage from "../ToastMessage";

import { toastEventManager } from "../../../utils/toast";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), // Gera um ID único para o toast
          type, // Tipo do toast (default, danger, success)
          text, // Texto do toast
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast); // Adiciona o listener para o evento personalizado

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast); // Limpa o listener ao desmontar o componente.
      // Isso é importante para evitar vazamentos de memória

    };
  }, []);

  function handleRemoveMessage(id) {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }


  return (
    <Container>
      {/* Toasts will 'be rendered here */}

      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage} // Passa a função de remoção para o ToastMessage
        />
      ))}
    </Container>
  );
}
