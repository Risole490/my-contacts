import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 48px;
  left: 50%; // Não utilizei display: flex para centralizar, pois o flexbox não é necessário aqui.
  transform: translateX(-50%); // Centraliza o container horizontalmente pegando o tamanho total do componente. O left 50% move o container para a metade da largura da tela, e o translateX(-50%) ajusta para que ele fique centralizado
`;
