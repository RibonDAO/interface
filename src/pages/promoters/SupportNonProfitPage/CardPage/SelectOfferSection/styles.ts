import styled from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmSemibold,
  defaultBodyXsRegular,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import Dropdown from "components/atomics/Dropdown";
import InputText from "components/atomics/inputs/InputText";
import ButtonComponent from "components/atomics/buttons/Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ValueContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ValueText = styled.p`
  ${stylizedDisplayXs}

  margin-right: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.brand.tertiary[200]};
`;

export const ValueInputContainer = styled.div`
  margin-right: ${({ theme }) => theme.spacing(8)};

  input {
    height: 40px;
    margin-bottom: ${({ theme }) => theme.spacing(0)};
    border: 1px solid ${({ theme }) => theme.colors.brand.secondary[700]};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.brand.secondary[700]};
  }
`;

export const ValueInput = styled(InputText)``;

export const CauseText = styled.p`
  ${defaultBodyXsRegular}

  height: 5.3rem;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const CauseTextHighlight = styled.span`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.brand.tertiary[400]};
`;

export const CurrencySelectorContainer = styled.div`
  width: 80px;

  img {
    width: 14px;
    filter: ${({ theme }) => theme.filters.filterred40};
  }
`;

export const CurrencySelector = styled(Dropdown)`
  border: 1px solid ${({ theme }) => theme.colors.brand.tertiary[800]};
`;

export const Title = styled.p`
  ${defaultBodySmSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(12)};
  text-align: center;
  color: ${({ theme }) => theme.colors.brand.tertiary[800]};
`;

export const ImpactSection = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ImpactText = styled.p`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.brand.tertiary[500]};
`;

export const CurrentLifeAmount = styled.h4`
  ${defaultBodyMdSemibold}

  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.colors.brand.tertiary[800]};
`;

export const HeartIcon = styled.img`
  margin-right: ${({ theme }) => theme.spacing(4)};
`;

export const ImpactDescription = styled.p`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const UserBalanceText = styled.p`
  ${defaultBodySmSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const UserBalanceTextHighlight = styled.span`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.brand.secondary[400]};
`;

export const DonateButton = styled(ButtonComponent)`
  border-color: ${({ theme }) => theme.colors.brand.tertiary[200]};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.brand.tertiary[200]};
  color: ${({ theme }) => theme.colors.brand.secondary[700]};
`;

export const Slider = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(40)};
`;
