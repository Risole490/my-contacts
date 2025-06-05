import styled, { css } from "styled-components";

// Variantes de cor para o container
const containerVariants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger.main};
    // border: 1px solid etc;
  `,
};

export const Container = styled.div`
  padding: 16px 32px;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; // Adiciona cursor de ponteiro para indicar que é clicável

  // Aplica a variante de cor baseada no tipo. Se o tipo não for encontrado, usa a variante default
  ${({ type }) => containerVariants[type] || containerVariants.default}

  & + & {
    margin-top: 12px; // Espaçamento entre as mensagens
  }

  img {
    margin-right: 8px; // Espaçamento entre o ícone e o texto
  }
`;
