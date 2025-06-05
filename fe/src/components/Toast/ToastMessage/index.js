import PropTypes from "prop-types";

import { Container } from "./styles";

import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";


{/* Toast message content will be rendered here */}
export default function ToastMessage({
  message, onRemoveMessage
}) {
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
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired, // Função para remover a mensagem
};
