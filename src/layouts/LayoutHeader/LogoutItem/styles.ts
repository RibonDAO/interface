import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { defaultBodyXsSemibold } from "styles/typography/default";

export const Container = styled.div``;

export const LogoutButton = styled(Button)`
  ${defaultBodyXsSemibold}

  min-width: 76px;
  padding: ${({ theme }) => theme.spacing(4, 12)};
  background: ${({ theme }) => theme.colors.neutral10};
`;
