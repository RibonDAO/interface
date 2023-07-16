import styled from "styled-components";
import Button from "components/atomics/buttons/Button";
import InputText from "components/atomics/inputs/InputText";
import { defaultBodySmRegular } from "styles/typography/default";

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

export const ValueInput = styled(InputText)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  border-radius: 4px;
`;

export const SaveButton = styled(Button)`
  width: 100%;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const SelectButton = styled(Button)`
  padding-block: 10px;
  width: calc(50% - 10px);
  height: 48px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.brand.primary[600]};
  border-radius: 5px;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.brand.primary[600]};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.primary[600]};
    color: ${({ theme }) => theme.colors.neutral10};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.brand.primary[600]};
    color: ${({ theme }) => theme.colors.neutral10};
  }
`;

export const SmallText = styled.p`
  ${defaultBodySmRegular}

  color: ${({ theme }) => theme.colors.neutral[700]};
`;
