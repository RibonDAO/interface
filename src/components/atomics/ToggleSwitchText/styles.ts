import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${() => theme.breakpoints.pad}) {
      width: 472px;
    }
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    max-height: 32px;
    max-left: 236px;
    max-top: 234px;
    background: ${theme.colors.ribonWhite};
    border: 1px solid ${theme.colors.ribonBlue};
    border-radius: 40px;
  `}
`;

export const Selected = styled.a`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: static;
    min-width: 50%;
    max-width: 236px;
    max-height: 30px;
    color: ${theme.colors.ribonWhite};
    font-weight: 700;
    font-size: 16px;
    line-height: 160%;
    background: ${theme.colors.ribonBlue};
    border-radius: 16px;
  `}
`;

export const Unselected = styled.a`
  ${({ theme }) => css`
    max-width: 236px;
    min-width: 50%;
    max-height: 32px;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 160%;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${theme.colors.ribonBlue};
  `}
`;
