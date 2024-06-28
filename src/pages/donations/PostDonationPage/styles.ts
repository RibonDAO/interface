import styled from "styled-components";
import { stylizedDisplaySm } from "styles/typography/stylized";
import { defaultBodyMdMedium } from "styles/typography/default";

export const TopContainer = styled.div`
  margin-top: -64px;
  align-items: center;
`;
export const Container = styled.div`
  height: 100vh;
  padding: 0 16px 16px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: hidden;

  color: ${({ theme }) => theme.colors.brand.primary[300]};
`;

export const ContentContainer = styled.div`
  max-width: 426px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.p`
  ${stylizedDisplaySm}

  margin-bottom: ${({ theme }) => theme.spacing(12)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Description = styled.p`
  ${defaultBodyMdMedium}

  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const ButtonContainer = styled.div`
  min-width: 360px;
  z-index: 3;
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
  }
`;

export const BackgroundSun = styled.div`
  width: 100%;
  position: absolute;
  bottom: -232px;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const sunAnimation = styled.img`
  width: 446px;
  height: 464px;
  animation: spin 50s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
