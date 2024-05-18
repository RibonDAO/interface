import styled from "styled-components";
import {
  defaultBodySmMedium,
  defaultHeadingXs,
} from "styles/typography/default";
import theme from "styles/theme";

export const Container = styled.div<{
  image: string;
}>`
  width: 296px;
  height: 432px;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: #ffe7fb;
`;

export const NgoName = styled.p`
  ${defaultBodySmMedium};
  color: ${theme.colors.neutral[600]};
`;

export const ImpactTitle = styled.p`
  ${defaultHeadingXs};
  color: ${theme.colors.neutral[800]};
  word-wrap: break-word;
`;

export const TicketsContainer = styled.div`
  width: 50px;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  width: 100%;
`;
