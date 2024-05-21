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
  align-items: center;
  justify-content: center;
`;

export const LeftImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
  }
`;

export const RightImage = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
  }
`;

export const MainContainer = styled.div`
  width: 100%;

  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 360px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 100%;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
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
  margin-top: ${({ theme }) => theme.spacing(32)};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(12)};
  text-align: center;
`;

export const Title = styled.p`
  ${stylizedDisplayXs}

  margin-top: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Description = styled.p`
  ${defaultBodyMdRegular}

  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(24)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const FilledButton = styled.button`
  ${defaultBodyMdSemibold}

  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[600]};
  border-radius: 4px;
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
  color: ${({ theme }) => theme.colors.neutral10};
`;
