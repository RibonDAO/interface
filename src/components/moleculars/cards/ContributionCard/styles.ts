import styled from "styled-components";
import {
  defaultBodyMdRegular,
  defaultBodyXsBold,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import Button from "components/atomics/buttons/Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 458px;
  background-color: ${({ theme }) => theme.colors.brand.primary[50]};
  border-radius: 8px;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(32)};
`;

export const Title = styled.h1`
  ${defaultBodyXsBold}
  color: ${({ theme }) => theme.colors.brand.primary[500]};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  text-transform: uppercase;
`;

export const Description = styled.p`
  ${defaultBodyMdRegular}
  color: ${({ theme }) => theme.colors.neutral[800]};
  margin-bottom: ${({ theme }) => theme.spacing(16)};

  b {
    font-style: bold;
  }
`;

export const DonationButton = styled(Button)`
  width: 100%;
  height: 48px;
  padding: ${({ theme }) => theme.spacing(12, 16)};
  background-color: ${({ theme }) => theme.colors.brand.primary[600]};
  border: none;
  color: ${({ theme }) => theme.colors.neutral[50]};
  border-radius: 4px;
`;

export const Value = styled.span`
  ${stylizedDisplayXs}
  color: ${({ theme }) => theme.colors.brand.primary[900]};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;
