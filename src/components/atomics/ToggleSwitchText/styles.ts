import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${() => theme.breakpoints.pad}) {
      width: 472px;
    }
    border: 1px solid ${theme.colors.ribonBlue};
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    background: ${theme.colors.ribonWhite};
    border-radius: 40px;
    box-sizing: border-box;
    cursor: pointer;
    text-align: center;
  `}
`;

export const Selected = styled.a`
  ${({ theme }) => css`
    min-width: 50%;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.6;
    background: ${theme.colors.ribonBlue};
    color: ${theme.colors.ribonWhite};
    border-radius: 16px;
  `}
`;

export const Unselected = styled(Selected)`
  ${({ theme }) => css`
    background: ${theme.colors.ribonWhite};
    color: ${theme.colors.ribonBlue};
  `}
`;
