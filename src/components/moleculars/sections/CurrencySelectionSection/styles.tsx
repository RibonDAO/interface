import styled from "styled-components";
import { stylizedDisplayMd } from "styles/typography/stylized";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const Amount = styled.h3`
  ${stylizedDisplayMd}
  color: ${({ theme }) => theme.colors.brand.primary[300]};
  font-weight: ${({ theme }) => theme.font.light};
`;

export const DropdownWrapper = styled.div`
  width: 100px;
  margin: auto 0;
`;
