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

export const Container = styled.div``;

export const FilledButton = styled.button`
  ${defaultBodyMdSemibold}

  width: 100%;
  max-width: 328px;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[600]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
  color: ${({ theme }) => theme.colors.neutral10};
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

export const Image = styled.img`
  max-width: 144px;
  padding: ${({ theme }) => theme.spacing(20)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.neutral10};
`;

export const DefaultImage = styled.img``;

export const ImageContainer = styled.div<{ backgroundImage: string }>`
  min-width: 232px;
  min-height: 208px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(24)};
  align-items: center;
  justify-content: center;
`;
