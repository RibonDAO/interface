import styled from "styled-components";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { defaultBodyMdRegular } from "styles/typography/default";
import Button from "components/atomics/buttons/Button";

export const OuterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(0, 16, 0, 16)};
`;

export const Title = styled.h1`
  ${stylizedDisplayXs}
  color: ${({ theme }) => theme.colors.neutral[25]};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

export const TextList = styled.li`
  ${defaultBodyMdRegular}
  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const CtaButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
  background-color: ${({ theme }) => theme.colors.brand.primary[200]};
  border-color: ${({ theme }) => theme.colors.brand.primary[200]};
`;
