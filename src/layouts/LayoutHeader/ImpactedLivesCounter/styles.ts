import styled from "styled-components";
import { defaultBodyXsSemibold } from "styles/typography/default";

export const Container = styled.div<{ outline: boolean }>`
  margin-left: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(0)} ${({ theme }) => theme.spacing(8)};
  border: 1px solid ${({ theme }) => theme.colors.brand.tertiary[300]};
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

export const LivesAmount = styled.p`
  ${defaultBodyXsSemibold}

  margin-right: ${({ theme }) => theme.spacing(4)};
  color: ${({ color }) => color};
`;

export const Image = styled.img`
  width: 12.5px;
`;
