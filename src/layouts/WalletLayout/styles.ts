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
  padding: 0 16px 16px 16px;

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

export const WalletButton = styled(Button)`
  ${() => css`
    cursor: pointer;
    height: 20px;
    padding: 5px 12px;
    font-size: 12px;
  `}
`;
