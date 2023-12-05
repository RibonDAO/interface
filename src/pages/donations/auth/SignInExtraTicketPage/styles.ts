import styled from "styled-components";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { defaultBodyMdMedium } from "styles/typography/default";
import ButtonComponent from "components/atomics/buttons/Button";

export const Image = styled.img``;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(24)};
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 328px;
    height: 380px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  text-align: center;
`;

export const MainContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.p`
  ${stylizedDisplayXs}

  margin-top: ${({ theme }) => theme.spacing(20)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Description = styled.p`
  ${defaultBodyMdMedium}

  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const Button = styled(ButtonComponent)`
  height: 48px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
  justify-content: center;
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

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
