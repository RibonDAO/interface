import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    flex-direction: column;
  `}
`;

export const CenterImage = styled.img`
  ${({ theme }) => css`
    width: 100%;
    border-radius: 50%;
    border: solid 5px ${theme.colors.ribonWhite};
    filter: drop-shadow(0px 20px 40px ${theme.colors.ribonShadow});
  `}
`;

export const LogoContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: ${theme.colors.ribonBlue};
    margin-top: -46px;
    z-index: 0;
  `}
`;

export const LogoImage = styled.img`
  ${() => css`
    width: 56px;
    height: 48px;
    margin: 16px 12px;
  `}
`;
