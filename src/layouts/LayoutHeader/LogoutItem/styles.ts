import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { defaultComponentTextSmall } from "styles/typography/default";

export const Container = styled.div``;

export const LogoutButton = styled(Button)`
  ${defaultComponentTextSmall}

  min-width: 76px;
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.neutral10};
`;
