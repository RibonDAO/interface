import styled from "styled-components";
import { stylizedDisplayLg } from "styles/typography/stylized";
import {
  defaultBodyMdRegular,
  defaultBodyXsRegular,
  defaultBodyMdSemibold,
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
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(24)};
  border-radius: 8px;
  box-shadow: 0 16px 32px -2px ${({ theme }) => theme.colors.defaultShadow10};
`;

export const DonationValueText = styled.h1<{ color: string }>`
  ${stylizedDisplayLg}

  text-align: center;
  color: ${({ color }) => color};
`;

export const Title = styled.h1`
  ${defaultBodyMdRegular}

  text-align: center;
`;

export const TitleHighlight = styled.span<{ color: string }>`
  ${defaultBodyMdSemibold}

  color: ${({ color }) => color};
`;

export const FeeText = styled.p`
  ${defaultBodyXsRegular}

  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.spacing(64)};
`;

export const BackArrowButton = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  cursor: pointer;
`;

export const DonateButtonContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: relative;
    background-color: transparent;
  }
`;

export const DonateButton = styled(Button)<{
  colorTheme: any;
}>`
  border-color: ${({ colorTheme }) => colorTheme.shade20};
  background-color: ${({ colorTheme }) => colorTheme.shade20};
  color: ${({ colorTheme }) => colorTheme.shade40};
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
