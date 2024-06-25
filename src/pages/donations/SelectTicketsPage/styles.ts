import styled from "styled-components";
import { defaultBodyMdMedium } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import ButtonComponent from "components/atomics/buttons/Button";

export const Title = styled.p`
  ${stylizedDisplayXs}
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 328px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(16)};
  margin-bottom: 52px;
`;

export const Subtitle = styled.p`
  ${defaultBodyMdMedium}
  min-height: 48px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Button = styled(ButtonComponent)`
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
  width: 100%;
  height: 48px;
  border-radius: 12px;
  margin-top: ${({ theme }) => theme.spacing(8)};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
