import styled from "styled-components";
import {
  defaultBodyMdMedium,
  defaultHeadingLg,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

export const Title = styled.p`
  ${stylizedDisplayXs}

  margin-top: ${({ theme }) => theme.spacing(20)};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const Description = styled.p`
  ${defaultBodyMdMedium}

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

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    align-items: center;
    justify-content: center;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(16)};
    position: fixed;
    bottom: 0;
    left: 0;
    display: block;
  }
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
  position: relative;
  top: 208px;
  left: 24px;
  z-index: 1;
  float: left;
`;
export const RightImageContainer = styled.img`
  position: relative;
  top: 72px;
  right: 24px;
  z-index: 1;
  float: right;
`;

export const DefaultImage = styled.img`
  width: 200px;
  height: 200px;
  align-self: center;
`;

export const ArrowContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing(16)};
  position: relative;
  display: flex;
  flex-direction: row;
  justify-self: center;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  min-height: 130px;
  padding: ${({ theme }) => theme.spacing(24)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.spacing(8)};
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.neutral10};
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
  padding-bottom: ${({ theme }) => theme.spacing(80)};
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 328px;
    height: 380px;
    align-items: center;
    justify-content: center;
  }
`;

export const BackArrowButton = styled.img`
  width: 24px;
  height: 24px;
  align-self: flex-start;

  cursor: pointer;
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogosWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  height: 100%;
  max-height: 32px;
`;
