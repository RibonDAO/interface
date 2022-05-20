import styled, { css } from "styled-components";

export const Container = styled.div``;

export const BodyContainer = styled.div`
  width: 100%;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      display: flex;
      flex-direction: column;
    }
  `}
`;

export const Title = styled.h1`
  text-transform: uppercase;
  margin: 0;
  font-weight: 900;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 36px;
    }
  `}
`;

export const CausesContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
    column-gap: 8px;
    row-gap: 8px;

    @media (min-width: ${theme.breakpoints.pad}) {
      margin-top: 56px;
      width: 70%;
      row-gap: 16px;
      column-gap: 12px;
    }
  `}
`;

export const CausesCardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.h5`
  ${({ theme }) => css`
    line-height: 19px;
    color: ${theme.colors.darkGray};
    text-align: center;
    font-weight: 400;

    a {
      color: ${theme.colors.ribonBlue};
      text-decoration: none;
    }
  `}
`;
