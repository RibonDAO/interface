import Button from "components/atomics/buttons/Button";
import styled from "styled-components";

export const Container = styled.div``;

export const UserSupportButton = styled(Button)`
  min-width: 76px;
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.white};
`;

export const GoButton = styled.img`
  cursor: pointer;
`;
