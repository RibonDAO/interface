import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { defaultComponentTextSmall } from "styles/typography/default";

export const Container = styled.div`
  height: 100%;
  margin-top: 24px;
  display: flex;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Text = styled.p`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const InsideContainer = styled.div`
  margin-right: 14px;
`;

export const ImageContainer = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 8px;
`;

export const SideButton = styled(Button)`
  ${defaultComponentTextSmall}
  height: 28px;
  padding: 6px 14px;
  border-radius: 16px;
`;
