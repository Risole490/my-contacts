
import PropTypes from "prop-types";

import { Container } from "./styles";

import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";


{/* Toast message content will be rendered here */}
export default function ToastMessage({ text, type, onRemoveMessage, id }) {
  // Função para lidar com o clique no toast e remover a mensagem
  function handleRemoveToast() {
    // Aqui você pode implementar a lógica para remover o toast, por exemplo, emitindo um evento ou atualizando o estado
    onRemoveMessage(id); // Chama a função passada como prop para remover a mensagem
  }

  return (
    <Container type={type} onClick={handleRemoveToast}> {/* O type é passado como prop para o Container, que pode usar isso para aplicar estilos diferentes nas variantes*/}

      {/* Renderiza os ícones baseado no type */}

      {type === "danger" && <img src={xCircleIcon} alt="X" />}
      {type === "success" && <img src={checkCircleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  id: PropTypes.number.isRequired, // ID único para identificar a mensagem
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "danger", "default"]), // oneOf é usado para restringir os valores possíveis
  onRemoveMessage: PropTypes.func.isRequired, // Função para remover a mensagem
};

ToastMessage.defaultProps = {
  type: "default", // Valor padrão para o tipo
};
