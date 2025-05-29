
import PropTypes from "prop-types";

import { Container } from "./styles";

import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";


{/* Toast message content will be rendered here */}
export default function ToastMessage({ text, type }) {
  return (
    <Container type={type}> {/* O type é passado como prop para o Container, que pode usar isso para aplicar estilos diferentes nas variantes*/}

      {/* Renderiza os ícones baseado no type */}

      {type === "danger" && <img src={xCircleIcon} alt="X" />}
      {type === "success" && <img src={checkCircleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "danger", "default"]), // oneOf é usado para restringir os valores possíveis
};

ToastMessage.defaultProps = {
  type: "default", // Valor padrão para o tipo
};
