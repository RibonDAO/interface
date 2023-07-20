import styled from "styled-components";
import { defaultBodyXsSemibold } from "styles/typography/default";

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.a`
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }
`;

export const ChangeCurrencyButton = styled.button`
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(8)};
  border: solid 1px ${({ theme }) => theme.colors.brand.primary[600]};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.brand.primary[600]};
  transition: background-color 0.2s ease-in-out;

  p {
    ${defaultBodyXsSemibold}

    margin-left: ${({ theme }) => theme.spacing(8)};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }
`;
