import { useState, useEffect } from "react";
import { Container } from "./styles";

import ToastMessage from "../ToastMessage";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    document.addEventListener('addtoast', (e) => {
      const { type, text } = e.detail; // Obtém os detalhes do evento

      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), // Gera um ID único para o toast
          type, // Tipo do toast (default, danger, success)
          text, // Texto do toast
        },
      ]);
    });
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
