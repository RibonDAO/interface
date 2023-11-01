import styled from "styled-components";
import Button from "components/atomics/buttons/Button";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
  defaultBodySmMedium,
  defaultBodySmSemibold,
  defaultBodyXsSemibold,
} from "styles/typography/default";
import {
  stylizedDisplayLg,
  stylizedDisplayMd,
} from "styles/typography/stylized";

export const Container = styled.div``;

export const Title = styled.h1`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[600]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${defaultBodyMdMedium}
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

export const RecurrenceTitle = styled.h1`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const PayableName = styled.span`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.brand.primary[600]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${defaultBodyMdSemibold}
  }
`;

export const PaymentMethods = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(12)};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-bottom: ${({ theme }) => theme.spacing(0)};
  }
`;

export const PaymentMethodsTitle = styled.h1`
  ${defaultBodyMdSemibold}

  margin-top: ${({ theme }) => theme.spacing(24)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;

export const RecurrenceContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
`;

export const RecurrenceButton = styled(Button)`
  ${defaultBodyXsSemibold}

  display: flex;
  align-items: center;
`;
