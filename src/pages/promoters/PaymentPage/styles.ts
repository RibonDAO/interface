import styled from "styled-components";
import { stylizedHeadingLarge } from "styles/typography/stylized";
import {
  defaultParagraphLarge,
  defaultParagraphSmall,
  defaultSubtitleLarge,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";
import WaveCut from "assets/images/wave-cut.svg";

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

export const DonateButtonContainer = styled.div`
  width: 100%;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: relative;
    background-color: transparent;
  }
`;

export const DonateButton = styled(Button)`
  border-color: ${({ theme }) => theme.colors.orange20};
  background-color: ${({ theme }) => theme.colors.orange20};
  color: ${({ theme }) => theme.colors.orange40};
`;

export const SupportImage = styled.img`
  mask-image: url(${WaveCut});
  mask-size: 100% 100%;
  width: 100%;
  height: 136px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  object-fit: cover;
`;
