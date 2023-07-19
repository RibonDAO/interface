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
  width: 100%;
  padding: ${({ theme }) => theme.spacing(0, 16, 0, 16)};
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  ${stylizedDisplayXs}

  margin-bottom: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.neutral[25]};
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
  border-color: ${({ theme }) => theme.colors.brand.primary[200]};
  background-color: ${({ theme }) => theme.colors.brand.primary[200]};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Label = styled.span`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;
export const LabelContainer = styled.div`
  width: 46px;
  height: 28px;
  border-color: ${({ theme }) => theme.colors.brand.primary[900]};
  border-radius: 30px;
  position: absolute;
  top: 0;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.feedback.success[50]};
`;
