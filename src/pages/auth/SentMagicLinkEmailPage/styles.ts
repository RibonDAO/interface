import styled from "styled-components";
import { stylizedDisplayXs } from "styles/typography/stylized";
import {
  defaultBodyMdBold,
  defaultBodyMdMedium,
} from "styles/typography/default";

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
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 368px;
  }
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

export const Text = styled.p`
  ${defaultBodyMdMedium}

  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const EmailText = styled.p`
  ${defaultBodyMdBold}
  
  color: ${({ theme }) => theme.colors.neutral[600]};
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
