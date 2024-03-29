import styled from "styled-components";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
  defaultBodySmMedium,
  defaultBodySmSemibold,
} from "styles/typography/default";
import {
  stylizedDisplayLg,
  stylizedDisplayMd,
} from "styles/typography/stylized";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Container = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    max-width: 424px;
    padding: ${({ theme }) => theme.spacing(24)};
    border-radius: ${({ theme }) => theme.spacing(8)};
    background-color: ${({ theme }) => theme.colors.neutral10};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow10};
  }
`;

export const ImageContainer = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: ${({ theme }) => theme.spacing(24)};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileImageContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  margin-left: calc(-1 * ${({ theme }) => theme.spacing(24)});
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const Headline = styled.h1`
  ${stylizedDisplayMd}

  margin-block: ${({ theme }) => theme.spacing(16)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${stylizedDisplayLg}
  }
`;

export const LoaderShape = styled.div`
  margin-block: ${({ theme }) => theme.spacing(8)};
  border-radius: ${({ theme }) => theme.spacing(8)};
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

export const PaymentTypes = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(12)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: ${({ theme }) => theme.spacing(0)};
  }
`;

export const PaymentTypesTitle = styled.h1`
  ${defaultBodyMdSemibold}

  margin-top: ${({ theme }) => theme.spacing(24)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;
