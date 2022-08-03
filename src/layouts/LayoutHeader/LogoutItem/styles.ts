import Button from "components/atomics/Button";
import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css``}
`;

export const LogoutButton = styled(Button)`
  ${({ theme }) => css`
    background: ${theme.colors.ribonWhite};
    padding: 4px 12px;
    line-height: 16px;
    min-width: 76px;
  `}
`;
