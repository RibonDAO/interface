import styled from "styled-components";
import {
  defaultBodyMdRegular,
  defaultBodyXsBold,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import Button from "components/atomics/buttons/Button";

export const Container = styled.div`
  max-width: 458px;
  padding: ${({ theme }) => theme.spacing(32)};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.brand.primary[50]};
`;

export const Title = styled.h1`
  ${defaultBodyXsBold}

  margin-bottom: ${({ theme }) => theme.spacing(8)};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.primary[500]};
`;

export const Description = styled.p`
  ${defaultBodyMdRegular}

  margin-bottom: ${({ theme }) => theme.spacing(16)};
  color: ${({ theme }) => theme.colors.neutral[800]};

  b {
    font-style: bold;
  }
`;

export const DonationButton = styled(Button)`
  width: 100%;
  height: 48px;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
  color: ${({ theme }) => theme.colors.neutral[50]};
`;

export const Value = styled.span`
  ${stylizedDisplayXs}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;
