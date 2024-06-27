import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { defaultBodyMdMedium } from "styles/typography/default";
import { stylizedDisplaySm } from "styles/typography/stylized";

export const Container = styled.div<{bg: string}>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-image: ${({ bg }) => `url(${bg})`};
  background-position: bottom;
  background-repeat: no-repeat;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(16)};
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TopContainer = styled.div`
  width: 100%;
  max-width: 426px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardImage = styled.img`
  object-position: center;
  width: 426px;
  height: 280px;
  border-radius: ${({ theme }) => theme.spacing(0, 0, 16, 16)};
  object-fit: cover;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 328px;
    height: 216px;
    border-radius: ${({ theme }) => theme.spacing(16)};
  }
`;

export const ImageWithIconOverlayContainer = styled.div`
  margin-top: -64px;
  align-items: center;
  z-index: ${({ theme }) => theme.zindex.above};
`;

export const TextContainer = styled.div`
  max-width: 328px;
  margin-bottom: ${({ theme }) => theme.spacing(40)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: ${({ theme }) => theme.spacing(8)};
  }
`;

export const Title = styled.h1`
  ${stylizedDisplaySm}

  margin-top: 12px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Subtitle = styled.span`
  ${defaultBodyMdMedium}

  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const ImpactDescription = styled.span`
  ${defaultBodyMdMedium}

  margin-bottom: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(24)};
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  padding: ${({ theme }) => theme.spacing(12)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-right: ${({ theme }) => theme.spacing(8)};
`;

export const ButtonContainer = styled.div`
  width: 360px;
  margin-bottom: ${({ theme }) => theme.spacing(48)};
  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(24)};
  align-items: center;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing(0)};
  }
`;

export const FinishButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(3)};
  border: 0px;
  display: block;
  justify-self: end;
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
`;
