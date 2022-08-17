import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.ribonWhite};
    flex-direction: column;
    align-items: center;
    padding: 20px 14px 14px 14px;
    border: 1px solid ${theme.colors.ribonWhite};
    box-sizing: border-box;
    border-radius: 16px;
    width: 100%;
    height: 100%;
    box-shadow: 0px 4px 12px 0px ${theme.colors.ribonShadow};
    max-width: 472px;
  `}
`;
