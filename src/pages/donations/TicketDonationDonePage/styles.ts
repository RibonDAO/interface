import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import { defaultBodyMdMedium } from "styles/typography/default";
import { stylizedDisplaySm } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: ${({ theme }) => theme.spacing(16)};
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
`;

export const TopContainer = styled.div`
  width: 100%;
  max-width: 426px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardImage = styled.img`
  width: 426px;
  height: 280px;
  border-radius: ${({ theme }) => theme.spacing(0, 0, 16, 16)};
  object-fit: cover;
  object-position: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 328px;
    height: 216px;
    border-radius: ${({ theme }) => theme.spacing(16)};
  }
`;

export const ImageWithIconOverlayContainer = styled.div`
  margin-top: -64px;
  align-items: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
  max-width: 328px;
  margin-bottom: ${({ theme }) => theme.spacing(40)};

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
  display: flex;
  width: 360px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(16)};
  margin-bottom: ${({ theme }) => theme.spacing(48)};

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
