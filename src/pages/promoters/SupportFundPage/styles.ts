import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
      max-width: 472px;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `}
`;

export const Title = styled.h1`
  text-transform: uppercase;
  margin: 4px 0;
  font-weight: 900;
  margin-bottom: 48px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 36px;
    }
  `}
`;
