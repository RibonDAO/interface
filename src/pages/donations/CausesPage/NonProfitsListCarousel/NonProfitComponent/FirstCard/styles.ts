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
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

export const NgoName = styled.p`
  ${defaultBodySmMedium}

  color: ${theme.colors.neutral[600]};
`;

export const ImpactTitle = styled.p`
  ${defaultHeadingXs}

  word-wrap: break-word;
  color: ${theme.colors.neutral[800]};
`;

export const TicketsContainer = styled.div`
  width: 50px;
`;

export const ButtonContainer = styled.div`
width: 100%;
display: flex;
  flex: 1;
  align-items: flex-end;
`;
