import styled from "styled-components";
import { defaultBodySmMedium } from "styles/typography/default";

export const Container = styled.div`
  padding-right: 228px;
  padding-left: 228px;
  margin-bottom: ${({ theme }) => theme.spacing(64)};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-right: 16px;
    padding-left: 16px;
  }
`;

export const GiftText = styled.p`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[700]};
`;

export const SelectContributionContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 328px;
  }
`;

export const GiftSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
`;

export const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(16)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${({ theme }) => theme.spacing(24)};
    background-color: transparent;
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