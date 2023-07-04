import styled from "styled-components";
import { stylizedDisplayLg } from "styles/typography/stylized";

export const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(64)};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.neutral[800]};
  ${stylizedDisplayLg}
  margin-bottom: ${({ theme }) => theme.spacing(32)};

  > * {
    color: ${({ theme }) => theme.colors.brand.primary[600]};
    font-size: inherit;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
  }
`;

export const ContainerItem = styled.div`
  > * {
    padding: ${({ theme }) => theme.spacing(16)};
    margin-bottom: ${({ theme }) => theme.spacing(16)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    > * {
      padding: ${({ theme }) => theme.spacing(32)};
    }
    &:first-child {
      margin-right: ${({ theme }) => theme.spacing(16)};
    }
  }
`;

export const Divider = styled.div`
  height: 8px;
  margin: 32px -16px;
  background-color: ${({ theme }) => theme.colors.neutral[50]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: none;
  }
`;