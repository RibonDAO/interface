import styled from "styled-components";
import { defaultParagraphSmall } from "styles/typography/default";
import { stylizedTitleLarge } from "styles/typography/stylized";
import Dropdown from "components/atomics/Dropdown";
import InputText from "components/atomics/inputs/InputText";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ValueContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ValueText = styled.p`
  ${stylizedTitleLarge}

  margin-right: 8px;
  color: ${({ theme }) => theme.colors.orange20};
`;

export const ValueInputContainer = styled.div`
  margin-right: 8px;

  input {
    height: 40px;
    margin-bottom: 0;
    border: 1px solid ${({ theme }) => theme.colors.orange40};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.orange40};
  }
`;

export const ValueInput = styled(InputText)``;

export const CauseText = styled.p`
  ${defaultParagraphSmall}

  margin-bottom: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const CauseTextHighlight = styled.span`
  ${defaultParagraphSmall}

  color: ${({ theme }) => theme.colors.orange30};
`;

export const CurrencySelectorContainer = styled.div`
  width: 80px;

  img {
    width: 14px;
    filter: ${({ theme }) => theme.filters.filterOrange40};
  }
`;

export const CurrencySelector = styled(Dropdown)`
  border: 1px solid ${({ theme }) => theme.colors.orange40};
`;
