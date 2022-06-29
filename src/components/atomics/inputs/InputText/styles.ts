import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    margin-bottom: 12px;
    border: 1px solid ${theme.colors.ribonBlue};
    border-radius: 8px;
    padding: 8px 16px 8px 16px;

    &:disabled {
      border: 1px solid ${theme.colors.darkGray};
    }
  `}
`;
