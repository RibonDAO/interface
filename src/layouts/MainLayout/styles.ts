import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      margin: 0 14%;
      margin-left: calc(14% + 80px);
    }
  `}
`;

export const BodyContainer = styled.div`
  padding: 24px 16px 16px 16px;
  margin-bottom: 64px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      padding: 0;
    }
  `}
`;

export const Settings = styled.img`
  ${() => css`
    cursor: pointer;
  `}
`;
