import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { defaultBodySmSemibold } from "styles/typography/default";

export const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
  justify-self: center;
`;

export const Text = styled.p`
  ${defaultBodySmSemibold}

  margin-top: ${({ theme }) => theme.spacing(32)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const EmptyDonationButton = styled(Button)`
  width: 200px;
  margin-top: ${({ theme }) => theme.spacing(16)};
`;
