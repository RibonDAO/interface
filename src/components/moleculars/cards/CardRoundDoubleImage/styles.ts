import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}
`;

export const ImageContainer = styled.div`
  ${() => css`
    position: relative;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    width: 310px;
    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
      width: 350px;
      height: 200px;
    }
  `}
`;

export const LeftImage = styled.img`
  ${({ theme }) => css`
    object-fit: cover;
    position: absolute;
    width: 180px;
    height: 180px;
    left: 0;
    border-radius: 50%;
    border: solid 5px ${theme.colors.ribonWhite};
    filter: drop-shadow(0px 20px 40px ${theme.colors.ribonShadow});

    @media (min-width: ${theme.breakpoints.pad}) {
      width: 200px;
      height: 200px;
    }
  `}
`;

export const RightImage = styled.img`
  ${({ theme }) => css`
    object-fit: cover;
    z-index: 1;
    position: absolute;
    width: 180px;
    height: 180px;
    right: 0;
    border-radius: 50%;
    filter: drop-shadow(0px 20px 40px ${theme.colors.ribonShadow});

    @media (min-width: ${theme.breakpoints.pad}) {
      width: 200px;
      height: 200px;
    }
  `}
`;
