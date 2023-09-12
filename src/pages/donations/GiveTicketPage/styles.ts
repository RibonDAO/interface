import styled from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultHeadingLg,
} from "styles/typography/default";
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const LeftImageContainer = styled.img`
  float: left;
  top: 208px;
  left: 24px;
  position: relative;
  z-index: 1;
`;
export const RightImageContainer = styled.img`
  float: right;
  top: 72px;
  right: 24px;
  position: relative;
  z-index: 1;
`;

export const Image = styled.img`
  max-width: 101px;
  padding: ${({ theme }) => theme.spacing(0, 8)};
`;

export const DefaultImage = styled.img``;

export const ImageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(24)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.neutral10};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 2;
  position: relative;
`;

export const ImageContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
`;

export const ImageContainerText = styled.p`
  ${defaultHeadingLg}
  padding: ${({ theme }) => theme.spacing(0, 8)};
  color: ${({ theme }) => theme.colors.brand.primary[200]};
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

export const BackArrowButton = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: ${({ theme }) => theme.spacing(40)};
  left: ${({ theme }) => theme.spacing(16)};

  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    left: 168px;
  }
`;

export const TooltipSection = styled.div`
  display: flex;
  justify-content: center;
`;
