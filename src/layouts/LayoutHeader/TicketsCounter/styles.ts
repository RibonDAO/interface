import styled from "styled-components";
import { defaultBodyXsSemibold } from "styles/typography/default";

export const CounterImage = styled.img`
  width: 12.5px;
`;

export const CounterContainer = styled.div<{ outline: boolean }>`
  margin-right: ${({ theme }) => theme.spacing(4)};
  margin-left: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(8)};
  border: 1px solid
    ${({ theme, outline }) =>
      outline ? theme.colors.neutral10 : theme.colors.neutral[200]};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: ${({ theme, outline }) =>
    outline ? theme.colors.brand.primary[900] : theme.colors.neutral10};

  &:hover {
    cursor: pointer;
  }
`;

export const TicketsAmount = styled.p<{ outline: boolean }>`
  ${defaultBodyXsSemibold}

  margin-right: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme, outline, color }) =>
    outline ? theme.colors.neutral10 : color};
`;
