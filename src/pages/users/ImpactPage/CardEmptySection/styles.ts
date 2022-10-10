import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { defaultSubtitleMedium } from "styles/typography/default";

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
  ${defaultSubtitleMedium}
  margin-top: 28px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const EmptyDonationButton = styled(Button)`
  width: 200px;
  margin-top: 14px;
`;
