import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    height: 56px;
    justify-content: space-between;
    margin: 0 16px;

    @media (min-width: ${theme.breakpoints.pad}) {
      height: 128px;
      margin-left: 0;
    }
  `}
`;

export const Logo = styled.img`
  ${() => css`
    height: 34px;
    width: 45px;
    object-fit: contain;
  `}
`;

export const Divider = styled.span`
  ${({ theme }) => css`
    font-weight: 600;
    color: ${theme.colors.lightGray};
    margin: 0 8px;
  `}
`;

export const RightContainer = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
    }
  `}
`;

export const LeftContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    height: 56px;

    @media (min-width: ${theme.breakpoints.pad}) {
      justify-content: center;
      height: 128px;
      margin-left: 0;
    }
  `}
`;

export const BackButtonImage = styled.img`
  cursor: pointer;
`;
