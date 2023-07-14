import styled from "styled-components";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
  defaultBodySmMedium,
  defaultBodySmSemibold,
  defaultBodyXsSemibold,
} from "styles/typography/default";
import { stylizedDisplayMd } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    max-width: 424px;
    padding: ${({ theme }) => theme.spacing(24)};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.neutral10};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow10};
  }
`;

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

export const Title = styled.h1`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[600]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${defaultBodyMdMedium}
  }
`;

export const PayableName = styled.span`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.brand.primary[600]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${defaultBodyMdSemibold}
  }
`;

export const PaymentMethods = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: ${({ theme }) => theme.spacing(0)};
  }
`;

export const PaymentMethodsTitle = styled.h1`
  ${defaultBodyMdSemibold}

  margin-top: ${({ theme }) => theme.spacing(24)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;

export const LoaderShape = styled.div`
  margin-block: ${({ theme }) => theme.spacing(8)};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }

    50% {
      background-color: ${({ theme }) => theme.colors.neutral[100]};
    }

    100% {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }
  }
`;

export const DonateButtonContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)};
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.neutral10};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding-inline: 0;
    padding-bottom: 0;
    position: relative;
    background-color: transparent;
  }
`;

export const Offer = styled.span`
  ${stylizedDisplayMd}

  margin-block: ${({ theme }) => theme.spacing(8)};
  display: flex;
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;

export const EditButton = styled.button`
  width: 40px;
  height: 40px;
  margin-left: ${({ theme }) => theme.spacing(8)};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary[50]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.primary[100]};
    cursor: pointer;
  }
`;
