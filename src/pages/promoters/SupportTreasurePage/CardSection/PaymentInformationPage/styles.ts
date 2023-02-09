import styled from "styled-components";
import Button from "components/atomics/buttons/Button";
import {
  defaultBodyXsSemibold,
  defaultBodyXsRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 472px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  ${stylizedDisplayLg}

  margin: ${({ theme }) => theme.spacing(4, 0)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

export const BillingInformationSectionContainer = styled.div`
  height: 256px;
  margin-top: ${({ theme }) => theme.spacing(24)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: auto;
  }
`;

export const BillingTitle = styled.h3`
  margin: ${({ theme }) => theme.spacing(20, 0)};
  color: ${({ theme }) => theme.colors.black};
`;

export const Form = styled.form`
  & :nth-child(2) {
    margin-right: ${({ theme }) => theme.spacing(4)};
  }
`;

export const HalfInput = styled.input`
  width: calc(50% - 4px);
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  padding: ${({ theme }) => theme.spacing(8, 16)};
  border: 1px solid ${({ theme }) => theme.colors.ribonBlue};
  border-radius: 8px;
  display: inline-block;
`;

export const CardSectionContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(24)};
`;

export const Subtitle = styled.p`
  ${defaultBodySmSemibold}

  margin-top: ${({ theme }) => theme.spacing(20)};
`;

export const ValuesContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(12)};
  margin-bottom: ${({ theme }) => theme.spacing(40)};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`;

export const CardValueButton = styled(Button)`
  ${defaultBodyXsSemibold}

  max-width: 112px;
  height: 30px;
  border-radius: 66px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zindex.navbar};
  display: flex;
  align-items: center;
  align-self: end;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 -4px 4px ${({ theme }) => theme.colors.defaultShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 60px;
    padding: ${({ theme }) => theme.spacing(0)};
    position: static;
    box-shadow: none;

    button {
      height: 40px;
    }
  }
`;

export const FinishButton = styled(Button)`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 56px;
  }
`;

export const GivingValue = styled.h2`
  margin-top: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.black};
`;

export const NetGivingValue = styled.p`
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const ServiceFeesValue = styled.p`
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const CryptoGivingValue = styled.p`
  ${defaultBodyXsRegular}

  margin-bottom: ${({ theme }) => theme.spacing(32)};
  font-style: italic;
  line-height: 19.2px;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const CardImpact = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ImpactSectionContainer = styled.div``;

export const ImpactSimulatorContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;

export const CardImpactImage = styled.img`
  width: 48px;
  height: 48px;
  margin-right: ${({ theme }) => theme.spacing(16)};
  border-radius: 50px;
  object-fit: cover;
`;

export const CardImpactText = styled.h3`
  color: ${({ theme }) => theme.colors.black};

  span {
    color: ${({ theme }) => theme.colors.ribonBlue};
  }
`;
