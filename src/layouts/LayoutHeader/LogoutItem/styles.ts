import { AuxiliarButton } from "components/atomics/typography/AuxiliarButtonText/styles";
import styled from "styled-components";

export const Container = styled.div``;

export const LogoutButton = styled(AuxiliarButton)`
  min-width: 76px;
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.white};
`;
