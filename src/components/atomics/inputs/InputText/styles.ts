import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    margin-bottom: 12px;
    padding: 8px 16px 8px 16px;
    border: 1px solid ${theme.colors.ribonBlue};
    border-radius: 8px;

    &:disabled {
      border: 1px solid ${theme.colors.darkGray};
    }
  `}
`;
