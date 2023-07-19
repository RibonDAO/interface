import styled from "styled-components";
import { stylizedDisplayXs } from "styles/typography/stylized";
import {
  defaultBodyMdRegular,
  defaultBodyXsRegular,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";

export const OuterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;
export const Container = styled.div`
  position: relative;
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

export const Text = styled.span`
  ${defaultBodyMdRegular}
  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const TextList = styled.li`
  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const CtaButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(24)};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
  background-color: ${({ theme }) => theme.colors.brand.primary[200]};
  border-color: ${({ theme }) => theme.colors.brand.primary[200]};
`;

export const Label = styled.span`
  ${defaultBodyXsRegular}
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;
export const LabelContainer = styled.div`
  border-radius: 30px;
  width: 46px;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.feedback.success[50]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.brand.primary[900]};
  position: absolute;
  top: 0;
  right: 16px;
`;
