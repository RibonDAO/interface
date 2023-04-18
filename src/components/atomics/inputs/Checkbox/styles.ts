import styled from "styled-components";
import { defaultBodySmRegular } from "styles/typography/default";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Paragraph = styled.p<{ isChecked: boolean }>`
  ${defaultBodySmRegular}

  text-decoration: ${({ isChecked }) => (isChecked ? "line-through" : "none")};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const Checkbox = styled.div<{ isChecked: boolean }>`
  width: 20px;
  height: 20px;
  margin-right: ${({ theme }) => theme.spacing(8)};
  border: solid 2px
    ${({ theme, isChecked }) =>
      isChecked
        ? theme.colors.brand.primary[900]
        : theme.colors.brand.primary[300]};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.brand.primary[900] : theme.colors.neutral[10]};
`;

export const NavigationButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.brand.primary[50]};
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.brand.primary[100]};
  }
`;
