import styled, { css } from "styled-components";
import Button from "components/atomics/buttons/Button";
import { MainBodyContainer, MainContainer } from "layouts/MainLayout/styles";

export const Container = styled(MainContainer)``;

export const BodyContainer = styled(MainBodyContainer)``;

export const WalletButton = styled(Button)`
  ${() => css`
    padding: 3px 12px;
  `}
`;
