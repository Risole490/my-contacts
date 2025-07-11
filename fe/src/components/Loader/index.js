import PropTypes from "prop-types";

import { Overlay } from "./styles";
import Spinner from "../Spinner";
import ReactPortal from "../ReactPortal";

import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";

export default function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading); // Hook personalizado para controlar a animação de desmontagem do loader

  if (!shouldRender) return null; // Se o loader não deve ser renderizado, não retorna nada

  return (
    <ReactPortal containerId="loader-root">
      <Overlay ref={animatedElementRef} isLeaving={!isLoading}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
