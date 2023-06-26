import Button from "components/atomics/buttons/Button";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-items: space-between;
  justify-content: space-between;
`;

export const SelectButton = styled(Button)<{ selected?: boolean }>`
  padding-block: 10px;
  width: calc(50% - 10px);
  height: 48px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[600]};
  border-radius: 5px;
  flex-grow: 1;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.brand.primary[600] : theme.colors.neutral10};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.neutral10 : theme.colors.brand.primary[600]};
  cursor: pointer;
`;
