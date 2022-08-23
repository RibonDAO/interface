import Button from "components/atomics/buttons/Button";
import styled from "styled-components";

export const Container = styled.div``;

export const LogoutButton = styled(Button)`
  min-width: 76px;
  padding: 4px 12px;
  line-height: 16px;
  background: ${({ theme }) => theme.colors.white};
`;
