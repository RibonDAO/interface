import styled from "styled-components";
import { stylizedDisplaySm } from "styles/typography/stylized";
import { defaultBodyMdMedium } from "styles/typography/default";

export const TopContainer = styled.div`
  align-items: center;
`;
export const Container = styled.div`
  height: 100vh;
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.brand.primary[300]};
`;

export const ContentContainer = styled.div`
  max-width: 360px;

  margin-top: 90px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.p`
  ${stylizedDisplaySm}

  margin-bottom: ${({ theme }) => theme.spacing(12)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Description = styled.p`
  ${defaultBodyMdMedium}

  margin-bottom: ${({ theme }) => theme.spacing(64)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;
export const BackgroundSun = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BreathingFace = styled.img`
  width: 100%;
`;
export const GreenSun = styled.img``;

export const ButtonContainer = styled.div`
  min-width: 360px;
  z-index: 3;
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;

    padding: ${({ theme }) => theme.spacing(0, 16, 16, 16)};
    position: absolute;
    bottom: 0;
    align-items: flex-end;
  }
`;
