import PropTypes from "prop-types";

import { Container } from "./styles";

import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";
import { useEffect } from "react";


{/* Toast message content will be rendered here */}
export default function ToastMessage({
  message, onRemoveMessage
}) {
  useEffect(() => {
    // Inicia o timer para remover o toast após 5 segundos
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000); // Usa a duração da mensagem ou 5000ms como padrão

    // Segunda forma do setTimeout. Onde a função é passada diretamente como callback
    // const timeoutId = setTimeout(
    //   onRemoveMessage,
    //   message.duration || 5000,
    //   message.id,
    // );


    // Limpa o timer quando o componente é desmontado ou quando a mensagem muda
    return () => {
      clearTimeout(timeoutId); // Limpa o timer para evitar vazamentos de memória
    };
  }, [message, onRemoveMessage]); // Dependência para garantir que a função seja chamada quando a mensagem mudar e quando onRemoveMessage for alterada

  // Função para lidar com o clique no toast e remover a mensagem
  function handleRemoveToast() {
    // Aqui você pode implementar a lógica para remover o toast, por exemplo, emitindo um evento ou atualizando o estado
    onRemoveMessage(message.id); // Chama a função passada como prop para remover a mensagem
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0} // Adiciona tabindex para tornar o container focável
      role="button"
    > {/* O type é passado como prop para o Container, que pode usar isso para aplicar estilos diferentes nas variantes*/}

      {/* Renderiza os ícones baseado no type */}

      {message.type === "danger" && <img src={xCircleIcon} alt="X" />}
      {message.type === "success" && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired, // ID único para identificar a mensagem
    text: PropTypes.string.isRequired, // Texto da mensagem
    type: PropTypes.oneOf(["success", "danger", "default"]), // Tipo da mensagem
    duration: PropTypes.number, // Duração do toast em milissegundos
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired, // Função para remover a mensagem
};
