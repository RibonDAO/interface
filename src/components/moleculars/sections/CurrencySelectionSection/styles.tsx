import styled from "styled-components";
import { stylizedHeadingMedium } from "styles/typography/stylized";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const Amount = styled.h3`
  ${stylizedHeadingMedium}
  color: ${({ theme }) => theme.colors.green30};
  font-weight: ${({ theme }) => theme.font.light};
`;

export const DropdownWrapper = styled.div`
  width: 100px;
  margin: auto 0;
`;
