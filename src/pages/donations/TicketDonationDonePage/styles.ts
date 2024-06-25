import Button from "components/atomics/buttons/Button";
import styled from "styled-components";
import {
  defaultBodyMdMedium,
  defaultBodySmRegular,
} from "styles/typography/default";
import { stylizedDisplaySm } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  height: ${window.innerHeight}px;
  padding: ${({ theme }) => theme.spacing(0, 16)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
`;

export const ImageContainer = styled.div``;

export const TopContainer = styled.div`
  width: 100%;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 216px;
  border-radius: ${({ theme }) => theme.spacing(16)};
`;

export const ImageWithIconOverlayContainer = styled.div`
  margin-top: -64px;
  align-items: center;
`;

export const Title = styled.h1`
  ${stylizedDisplaySm}

  margin-top: 12px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Subtitle = styled.p`
  ${defaultBodySmRegular}

  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const FinishButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  border: 0px;
  display: block;
  justify-self: end;
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
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

export const ImpactDescription = styled.p`
  ${defaultBodyMdMedium}

  margin-bottom: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(48)};
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

export const Image = styled.img``;
