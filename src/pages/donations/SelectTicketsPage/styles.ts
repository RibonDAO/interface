import styled from "styled-components";
import { defaultBodyMdMedium } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import ButtonComponent from "components/atomics/buttons/Button";

export const Title = styled.p`
  ${stylizedDisplayXs}

  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  width: 328px;
  margin-bottom: 52px;
  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(24)};
  align-items: center;
  text-align: center;
`;

export const Subtitle = styled.p`
  ${defaultBodyMdMedium}

  min-height: 48px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Button = styled(ButtonComponent)`
  width: 100%;
  height: 48px;
  margin-top: ${({ theme }) => theme.spacing(8)};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
`;

export const TextContainer = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
