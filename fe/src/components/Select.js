import styled from "styled-components";

export default styled.select`
  width: 100%;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  height: 50px;
  border-radius: 4px;
  border: 2px solid #fff;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
    cursor: not-allowed;
    opacity: 1;
  }
`;
