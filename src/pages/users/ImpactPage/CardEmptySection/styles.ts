import Button from "components/atomics/buttons/Button";
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

export const Text = styled.p`
  margin-top: 28px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const EmptyDonationButton = styled(Button)`
  width: 200px;
  margin-top: 14px;
`;
