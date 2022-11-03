import styled from "styled-components";
import { stylizedHeadingLarge } from "styles/typography/stylized";
import {
  defaultParagraphLarge,
  defaultParagraphSmall,
  defaultSubtitleLarge,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";

export const MainContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 472px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export const Container = styled.div``;

export const ContentContainer = styled.div`
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 16px 32px -2px ${({ theme }) => theme.colors.defaultShadow10};
`;

export const DonationValueText = styled.h1`
  ${stylizedHeadingLarge};
  text-align: center;
  color: ${({ theme }) => theme.colors.orange20};
`;

export const Title = styled.h1`
  ${defaultParagraphLarge};
  text-align: center;
`;

export const TitleHighlight = styled.span`
  ${defaultSubtitleLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.orange30};
`;

export const FeeText = styled.p`
  ${defaultParagraphSmall};
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 64px;
`;

export const BackArrowButton = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const DonateButton = styled(Button)``;

export const SupportImage = styled.img`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
