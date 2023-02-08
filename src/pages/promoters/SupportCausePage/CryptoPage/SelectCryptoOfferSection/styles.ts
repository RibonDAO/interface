import styled from "styled-components";
import { defaultBodyXsRegular } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import Dropdown from "components/atomics/Dropdown";
import InputText from "components/atomics/inputs/InputText";

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
  color: ${({ theme }) => theme.colors.brand.secondary[300]};
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

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const CauseTextHighlight = styled.span`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.brand.secondary[400]};
`;

export const CurrencySelectorContainer = styled.div`
  width: 80px;

  img {
    width: 14px;
    filter: ${({ theme }) => theme.filters.filterOrange40};
  }
`;

export const CurrencySelector = styled(Dropdown)`
  border: 1px solid ${({ theme }) => theme.colors.brand.secondary[700]};
`;
