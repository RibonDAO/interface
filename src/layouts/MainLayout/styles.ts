import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      margin: 0 14%;
      margin-left: calc(14% + 80px);
      max-width: 100%;
      display: flex;
      flex-direction: column;
    }
  `}
`;

export const MainBodyContainer = styled.div`
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
