import styled from "styled-components";
import {
  defaultBodyLgSemibold,
  defaultBodySmMedium,
} from "styles/typography/default";

export const Container = styled.div<{ checked: boolean }>`
  width: 328px;
  border: ${({ theme, checked }) =>
    checked
      ? `4px solid ${theme.colors.brand.tertiary[600]}`
      : `4px solid ${theme.colors.neutral10} `};
  border-radius: ${({ theme }) => theme.spacing(16)};
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.brand.tertiary[25] : theme.colors.neutral10};
`;

export const Tag = styled.div`
  ${defaultBodySmMedium}

  width: fit-content;
  padding: ${({ theme }) => theme.spacing(0, 16)};
  border-radius: ${({ theme }) => theme.spacing(12, 0)};
  display: flex;

  background: ${({ theme }) => theme.colors.brand.tertiary[200]};
  color: ${({ theme }) => theme.colors.brand.tertiary[900]};
`;

export const MainContent = styled.div`
  padding: ${({ theme }) => theme.spacing(8, 20, 20, 20)};
  display: flex;
  flex-direction: column;
`;

export const SelectValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.brand.tertiary[600]};
`;

export const Value = styled.h4`
  ${defaultBodyLgSemibold}
`;

export const Recurrence = styled.div`
  ${defaultBodySmMedium}
`;

export const Checkbox = styled.div<{ checked: boolean }>`
  width: ${({ theme }) => theme.spacing(20)};
  height: ${({ theme }) => theme.spacing(20)};
  border: ${({ theme, checked }) =>
    checked
      ? `6px solid ${theme.colors.brand.tertiary[600]}`
      : `2px solid ${theme.colors.neutral[600]}`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Description = styled.div`
  margin-top: ${({ theme }) => theme.spacing(8)};
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
`;

export const DescriptionText = styled.div``;

export const Text = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;
