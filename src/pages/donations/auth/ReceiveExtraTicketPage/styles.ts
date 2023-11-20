import styled from "styled-components";
import { defaultBodyMdSemibold } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

export const Title = styled.p`
  ${stylizedDisplayXs}

  margin-top: ${({ theme }) => theme.spacing(20)};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const Description = styled.p`
  ${defaultBodyMdSemibold}

  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  text-align: center;
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FilledButton = styled.button`
  ${defaultBodyMdSemibold}

  width: 100%;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[600]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const BackgroundShapes = styled.img`
  width: 100%;
  height: 296px;
`;

export const ImageBackground = styled.div`
  rotate: 180deg;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const MainImage = styled.img`
  width: 150%;
  height: 100%;
  border-radius: 8px;
  z-index: 1;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 200%;
  }
`;

export const ImageContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(16, 64, 48)};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(24)};
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 328px;
    height: 380px;
  }
`;
