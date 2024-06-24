import styled from "styled-components";
import { defaultBodyMdMedium } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import ButtonComponent from "components/atomics/buttons/Button";

export const Title = styled.p`
  ${stylizedDisplayXs}

  margin-bottom: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(0, 16)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainContainer = styled.div`
  width: 100%;
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

export const Subtitle = styled.p`
  ${defaultBodyMdMedium}

  min-height: 48px;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Icon = styled.img`
  width: 128px;
  height: 128px;
  z-index: 1;
  object-fit: cover;
`;

export const Button = styled(ButtonComponent)`
  height: 48px;
  margin-top: ${({ theme }) => theme.spacing(24)};
`;
