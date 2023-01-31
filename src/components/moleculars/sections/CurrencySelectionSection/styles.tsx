import styled from "styled-components";
import { stylizedDisplayMd } from "styles/typography/stylized";
import { getPrimary } from "styles/colors/utils";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const Amount = styled.h3`
  ${stylizedDisplayMd}
  color: ${({ theme }) => getPrimary(theme).colorBrandPrimary300};
  font-weight: ${({ theme }) => theme.font.light};
`;

export const DropdownWrapper = styled.div`
  width: 100px;
  margin: auto 0;
`;
