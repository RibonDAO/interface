import styled from "styled-components";
import { stylizedDisplayXs } from "styles/typography/stylized";
import {
  defaultBodyLgBold,
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
} from "styles/typography/default";
import ButtonComponent from "components/atomics/buttons/Button";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(0, 16)};
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: ${({ theme }) => theme.spacing(24)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 368px;
  }
`;

export const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const MainImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  z-index: 1;
  object-fit: cover;
`;

export const Title = styled.h1`
  ${stylizedDisplayXs}

  margin-bottom: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Description = styled.p`
  ${defaultBodyMdSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Button = styled(ButtonComponent)`
  height: 48px;
`;

export const BackgroundShapes = styled.img`
  width: 100%;
  height: 296px;
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

export const NewImpactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const NewImpactTitle = styled.h3`
  ${defaultBodyLgBold}
`;

export const NewImpactDescription = styled.p`
  ${defaultBodyMdMedium}
`;
