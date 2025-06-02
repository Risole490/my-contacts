import { useState, useEffect } from "react";
import { Container } from "./styles";

import ToastMessage from "../ToastMessage";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast(e) {
      const { type, text } = e.detail; // Obtém os detalhes do evento

      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), // Gera um ID único para o toast
          type, // Tipo do toast (default, danger, success)
          text, // Texto do toast
        },
      ]);
    }

    document.addEventListener('addtoast', handleAddToast); // Adiciona o listener para o evento personalizado

    return () => {
      document.removeEventListener('addtoast', handleAddToast); // Limpa o listener ao desmontar o componente.
      // Isso é importante para evitar vazamentos de memória

    };
  }, []);


  return (
    <Container>
      {/* Toasts will 'be rendered here */}

      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}
