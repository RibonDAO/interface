import styled from "styled-components";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
  defaultBodySmMedium,
  defaultBodySmSemibold,
} from "styles/typography/default";

export const Container = styled.div``;

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
