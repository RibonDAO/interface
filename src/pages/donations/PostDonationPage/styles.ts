import styled from "styled-components";
import { stylizedDisplaySm } from "styles/typography/stylized";
import { defaultBodyMdMedium } from "styles/typography/default";

export const TopContainer = styled.div`
  align-items: center;
`;
export const Container = styled.div`
  color: ${({ theme }) => theme.colors.brand.primary[300]};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 16px 16px 16px;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
  align-items: center;
  z-index: 2;

  margin-top: 90px;
`;

export const Title = styled.p`
  ${stylizedDisplaySm}
  color: ${({ theme }) => theme.colors.neutral[800]};
  margin-bottom: ${({ theme }) => theme.spacing(12)};
`;

export const Description = styled.p`
  ${defaultBodyMdMedium}
  color: ${({ theme }) => theme.colors.neutral[600]};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(64)};
`;
export const BackgroundSun = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  z-index: 1;
`;

export const BreathingFace = styled.img`
  width: 100%;
`;
export const GreenSun = styled.img``;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  z-index: 3;
  min-width: 360px;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    align-items: flex-end;
    width: 100%;
    position: absolute;
    bottom: 0;

    padding: ${({ theme }) => theme.spacing(0, 16, 16, 16)};
  }
`;
