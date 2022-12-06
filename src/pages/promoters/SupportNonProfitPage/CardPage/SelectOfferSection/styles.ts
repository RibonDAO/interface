import styled from "styled-components";
import {
  defaultComponentTextMedium,
  defaultParagraphSmall,
} from "styles/typography/default";
import { stylizedTitleLarge } from "styles/typography/stylized";
import Dropdown from "components/atomics/Dropdown";

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
  color: ${({ theme }) => theme.colors.red20};
`;

export const CauseText = styled.p`
  ${defaultParagraphSmall}

  height: 5.3rem;
  margin-bottom: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray30};
`;

export const CauseTextHighlight = styled.span`
  ${defaultParagraphSmall}

  color: ${({ theme }) => theme.colors.red30};
`;

export const CurrencySelectorContainer = styled.div`
  width: 80px;

  img {
    width: 14px;
    filter: ${({ theme }) => theme.filters.filterred40};
  }
`;

export const CurrencySelector = styled(Dropdown)`
  border: 1px solid ${({ theme }) => theme.colors.red40};
`;

export const Title = styled.p`
  ${defaultComponentTextMedium}

  margin-bottom: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.red40};
`;
