import styled from "styled-components";
import {
  defaultBodySmSemibold,
  defaultBodyXsRegular,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import Dropdown from "components/atomics/Dropdown";

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
