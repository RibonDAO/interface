import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      margin: 0 14%;
    }
  `}
`;
