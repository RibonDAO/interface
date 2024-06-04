import styled from "styled-components";
import {
  defaultBodyLgSemibold,
  defaultBodyMdRegular,
  defaultBodyXsBold,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import Button from "components/atomics/buttons/Button";

export type ThemeShades = {
  25: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export const Container = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(48)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing(40)};
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  flex-basis: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 110%;
    margin: 0 -16px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 240px;
  border-radius: 0;
  position: relative;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    border-radius: 8px;
    left: initial;
  }
`;

export const TextContainer = styled.div<{ colorTheme: ThemeShades }>`
  height: 240px;
  padding: ${({ theme }) => theme.spacing(32)};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${({ colorTheme }) => colorTheme[50]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 458px;
  }
`;

export const Title = styled.h1<{ colorTheme: ThemeShades }>`
  ${defaultBodyXsBold}

  margin-bottom: ${({ theme }) => theme.spacing(8)};
  text-transform: uppercase;
  color: ${({ colorTheme }) => colorTheme[500]};
`;

export const Description = styled.p`
  ${defaultBodyMdRegular}

  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[800]};

  b {
    font-style: bold;
  }
`;

export const DonationButton = styled(Button)<{ colorTheme: ThemeShades }>`
  width: 100%;
  height: 48px;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: none;
  border-radius: 4px;
  background-color: ${({ colorTheme }) => colorTheme[600]};
  color: ${({ theme }) => theme.colors.neutral[50]};
`;

export const Value = styled.span<{ colorTheme: ThemeShades }>`
  ${stylizedDisplayXs}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ colorTheme }) => colorTheme[900]};
`;

export const Centered = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LifeAmount = styled.h4`
  ${defaultBodyLgSemibold}

  margin-block: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.colors.brand.tertiary[800]};
`;

export const HeartIcon = styled.img`
  margin-right: ${({ theme }) => theme.spacing(4)};
`;

export const ImpactDescription = styled.p`
  ${defaultBodyMdRegular}

  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;
