import PropTypes from "prop-types";

import { Overlay } from "./styles";
import Spinner from "../Spinner";
import ReactPortal from "../ReactPortal";

export default function Loader({ isLoading }) {
  if (!isLoading) return null; // Se não estiver carregando, não renderiza nada

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
