import styled, { keyframes, css } from "styled-components";

// @keyframes no css
const fadeIn = keyframes` // Define a animação de fade-in
  // A animação faz o elemento aparecer gradualmente
  // começando com opacidade 0 e terminando com opacidade 1
  from {
    // Estilos iniciais
    opacity: 0;
  }
  to {
    // Estilos finais
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes` // Define a animação de scale-in
  // A animação faz o elemento crescer de 0 a 1
  // dando a sensação de que ele está sendo "aberto" ou "expandido"
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s; // forwards mantém o estado final da animação

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 0.3s;`}
`;

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  animation: ${scaleIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${scaleOut} 0.3s;`}

  > h1 { // A seta é usada para selecionar apenas o elemento filho direto.
    font-size: 22px;
    color: ${({ theme, danger }) => (
      danger ? theme.colors.danger.main : theme.colors.gray[900]
    )}
  }

  .modal-body {
    margin-top: 32px;
  }

`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
