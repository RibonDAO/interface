import styled from "styled-components";
import {
  defaultBodyMdRegular,
  defaultBodySmMedium,
  defaultBodyXsRegular,
} from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled.input<{
  borderColor?: Record<string, any>;
  textColor?: string;
}>`
  ${defaultBodyMdRegular}

  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(12)};
  border: 1px solid
    ${(props) => props.borderColor?.default || props.theme.colors.neutral[300]};
  border-radius: 4px;
  color: ${(props) => props.textColor || props.theme.colors.neutral[900]};

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${({ theme }) => theme.colors.neutral[500]};
  }

  &:active,
  &:focus {
    /* this is here to avoid input increase size because of border increase */
    padding: 11px;
    border: 2px solid
      ${(props) => props.borderColor?.active || props.theme.colors.neutral[600]};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
    background: ${({ theme }) => theme.colors.neutral[50]};

    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${({ theme }) => theme.colors.neutral[400]};
    }
  }

  &.success {
    padding-right: ${({ theme }) => theme.spacing(48)};
    border: 1px solid ${({ theme }) => theme.colors.brand.primary[600]};
  }

  &.error {
    border: 1px solid ${({ theme }) => theme.colors.feedback.error[600]};
  }

  &.icon-left {
    padding-left: ${({ theme }) => theme.spacing(48)};
  }

  &.icon-right {
    padding-right: ${({ theme }) => theme.spacing(48)};
  }
`;

export const LabelContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.p`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[700]};

  span {
    ${defaultBodySmMedium}

    color: ${({ theme }) => theme.colors.feedback.error[600]};
  }
`;

export const LabelIcon = styled.img`
  width: 20px;
  height: 20px;

  &.right {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }

  &.left {
    margin-right: ${({ theme }) => theme.spacing(4)};
  }
`;

export const HelperContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Helper = styled.p`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const HelperIcon = styled.img`
  width: 14px;
  height: 14px;

  &.right {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }

  &.left {
    margin-right: ${({ theme }) => theme.spacing(4)};
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  padding: 2px;
  position: absolute;
  top: 14px;

  &.left {
    left: 14px;
  }

  &.right {
    right: 14px;
  }
`;

export const SuccessIcon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 14px;
  right: 14px;
`;

export const Span = styled.span`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.feedback.error[600]};
`;

export const ErrorIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: ${({ theme }) => theme.spacing(4)};
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
