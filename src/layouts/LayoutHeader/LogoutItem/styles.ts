import Button from "components/atomics/Button";
import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css``}
`;

export const LogoutButton = styled(Button)`
  ${() => css`
    background: #ffffff;
    padding: 4px 12px;
    line-height: 16px;
    min-width: 76px;
  `}
`;
