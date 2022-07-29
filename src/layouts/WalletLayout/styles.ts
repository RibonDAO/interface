import styled, { css } from "styled-components";
import Button from "components/atomics/Button";

export const Container = styled.div`
  width: 100%;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      margin: 0 14%;
    }
  `}
`;

export const BodyContainer = styled.div`
  padding: 24px 16px 16px 16px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      padding: 0;
    }
  `}
`;

export const WalletButton = styled(Button)`
  ${() => css`
    cursor: pointer;
    padding: 3px 12px;
    font-size: 12px;
  `}
`;
