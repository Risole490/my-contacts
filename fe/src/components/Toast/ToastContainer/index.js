import { useState, useEffect, useCallback } from "react";
import { Container } from "./styles";

import ToastMessage from "../ToastMessage";

import { toastEventManager } from "../../../utils/toast";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      // Iniciar o timer aqui dentro é uma das opções para remover o toast.
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), // Gera um ID único para o toast
          type, // Tipo do toast (default, danger, success)
          text, // Texto do toast
          duration, // Duração do toast, padrão é 3000ms
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast); // Adiciona o listener para o evento personalizado

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast); // Limpa o listener ao desmontar o componente.
      // Isso é importante para evitar vazamentos de memória
    };
  }, []);

  // A função mudou de function para useCallback para evitar recriações desnecessárias
  // e garantir que a referência permaneça a mesma entre renderizações.
  // useCallback é usado para memorizar a função e evitar que ela seja recriada em cada renderização.
  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }, []);


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
