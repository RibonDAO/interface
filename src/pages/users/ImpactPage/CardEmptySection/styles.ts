import Button from "components/atomics/buttons/Button";
import { BoldP } from "components/atomics/typography/BoldText/styles";
import styled from "styled-components";

export const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
  justify-self: center;
`;

export const Text = styled(BoldP)`
  margin-top: 28px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const EmptyDonationButton = styled(Button)`
  width: 200px;
  margin-top: 14px;
`;
