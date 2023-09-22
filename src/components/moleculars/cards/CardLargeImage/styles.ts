import styled from "styled-components";
import {
  defaultBodyLgSemibold,
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";
import ButtonComponent from "components/atomics/buttons/Button";
import ThemeShades from "types/entities/ThemeShades";
import { stylizedDisplayXs } from "styles/typography/stylized";

export const Container = styled.div<{ colorTheme: ThemeShades }>`
  width: calc(100% + 32px);
  margin-right: -16px;
  margin-left: -16px;
  padding: ${({ theme }) => theme.spacing(0, 16, 24, 16)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ colorTheme }) => colorTheme[25]};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
    margin-right: 0;
    margin-left: 0;
    padding: ${({ theme }) => theme.spacing(32)};
    display: flex;
    flex-direction: row;
  }
`;

export const Subtitle = styled.h4`
  ${defaultBodyLgSemibold}

  margin-block: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.colors.brand.tertiary[600]};
`;

export const Description = styled.p`
  ${defaultBodySmRegular}

  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

export const Button = styled(ButtonComponent)<{ colorTheme: ThemeShades }>`
  ${defaultBodyMdSemibold}

  width: 100%;
  height: 48px;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: none;
  border-radius: 4px;
  background-color: ${({ colorTheme }) => colorTheme[300]};
  color: ${({ colorTheme }) => colorTheme[800]};
`;

export const Title = styled.span<{ colorTheme: ThemeShades }>`
  ${stylizedDisplayXs}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ colorTheme }) => colorTheme[800]};
`;

export const Image = styled.img`
  width: calc(100% + 32px);
  max-height: 192px;
  margin-right: -16px;
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  margin-left: -16px;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
    max-height: 256px;
    margin: -32px 40px -32px -32px;
    border-radius: 8px;
  }
`;

export const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
