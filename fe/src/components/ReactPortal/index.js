import PropTypes from "prop-types";
import ReactDOM from "react-dom";

// Este componente ReactPortal é um exemplo de como criar um portal
// que permite renderizar componentes React fora da hierarquia DOM pai.

export default function ReactPortal({ containerId, children }) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div"); // Cria um novo elemento div
    container.setAttribute("id", containerId); // Define o ID do elemento
    document.body.appendChild(container); // Adiciona o elemento ao body do documento
  }

  return ReactDOM.createPortal(
    children,
    container // Renderiza os filhos dentro do container especificado
  );
}

ReactPortal.propTypes = {
  containerId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, // Permite qualquer tipo de filho React
};

ReactPortal.defaultProps = {
  containerId: "portal-root", // ID padrão para o portal
};
