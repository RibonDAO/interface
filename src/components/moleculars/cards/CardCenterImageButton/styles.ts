import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.ribonWhite};
    flex-direction: column;
    align-items: center;
    padding: 4px;
    border: 1px solid ${theme.colors.ribonWhite};
    box-sizing: border-box;
    border-radius: 16px;
    width: 100%;
    height: 100%;
    box-shadow: 0px 4px 12px 0px ${theme.colors.ribonShadow};
  `}
`;

export const Image = styled.img`
  ${({ theme }) => css`
    width: 100%;
    height: 194px;
    border-radius: 16px;
    object-fit: cover;

    @media (min-width: ${theme.breakpoints.pad}) {
      height: auto;
    }
  `}
`;

export const ContainerText = styled.div`
  ${() => css`
    padding: 8px 12px 12px 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;

export const Text = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-weight: 700;
    text-align: center;
    margin-bottom: 8px;
  `}
`;
