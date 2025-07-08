import PropTypes from 'prop-types';

import { Container, Overlay, Footer } from './styles';

import Button from '../Button';
import ReactPortal from '../ReactPortal';
import { useEffect, useState } from 'react';

export default function Modal({
  danger,
  visible,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  }) {
    const [shouldRender, setShouldRender] = useState(visible); // Usamos useState para controlar se o modal deve ser renderizado

    useEffect(() => {
      // Quando a visibilidade do modal mudar, atualiza o estado shouldRender
      if(visible){
        setShouldRender(true);
      }

      let timeoutId; // Variável para armazenar o ID do timeout

      if(!visible){
        // Se o modal for fechado, espera um tempo para remover o modal do DOM
        timeoutId = setTimeout(() => {
          setShouldRender(false);
        }, 300); // O tempo deve ser o mesmo da animação de fechamento do modal
      }

      // Limpa o timeout se o componente for desmontado ou se visible mudar
      return () => {
        clearTimeout(timeoutId);
      };
    }, [visible]);

    if(!shouldRender) { // Se o modal não estiver visível, não renderiza nada
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className='cancel-button'
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
              >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
