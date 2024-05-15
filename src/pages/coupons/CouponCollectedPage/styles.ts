import styled from "styled-components";
import {
  defaultBodyMdRegular,
  defaultBodyMdSemibold,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const MainContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 360px;
    height: 100%;
    justify-content: center;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 100%;
  }
`;

export const Header = styled.div``;

export const Logo = styled.img`
  height: 100%;
  max-height: 24px;
`;

export const DefaultImage = styled.img`
  width: 100%;
  max-height: 198px;
  margin-top: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: ${({ theme }) => theme.spacing(32)};
  }
`;

export const TextContainer = styled.div`
  width: 328px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(12)};
  align-self: center;
  text-align: center;
`;

export const Title = styled.p`
  ${stylizedDisplayXs}

  margin-top: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Description = styled.p`
  ${defaultBodyMdRegular}

  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding-top: ${({ theme }) => theme.spacing(24)};
  }
`;

export const Link = styled.a`
  ${defaultBodyMdSemibold}

  padding: ${({ theme }) => theme.spacing(12, 16)};
  text-align: center;
  color: ${({ theme }) => theme.colors.brand.primary[800]};
  cursor: pointer;
`;
