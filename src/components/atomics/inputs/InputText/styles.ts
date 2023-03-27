import styled, { css } from "styled-components";
import {
  defaultBodyMdRegular,
  defaultBodySmMedium,
  defaultBodyXsRegular,
} from "styles/typography/default";
import Icon from "components/atomics/Icon";
import InputMask from "react-input-mask";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled(InputMask)<{
  borderColor?: Record<string, any>;
  textColor?: string;
  status?: string;
  icon?: Record<string, any>;
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

    ${(props) =>
      props.status === "success" &&
      css`
        /* this is here to avoid input increase size because of border increase */
        padding-right: 39px;
      `}

    ${(props) =>
      props.icon?.class === "left" &&
      css`
        /* this is here to avoid input increase size because of border increase */
        padding-left: 39px;
      `}
  

    ${(props) =>
      props.icon?.class === "right" &&
      css`
        /* this is here to avoid input increase size because of border increase */
        padding-right: 39px;
      `}
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
    background: ${({ theme }) => theme.colors.neutral[50]};

    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${({ theme }) => theme.colors.neutral[400]};
    }
  }

  ${(props) =>
    props.status === "success" &&
    css`
      padding-right: ${({ theme }) => theme.spacing(40)};
      border-color: ${({ theme }) => theme.colors.brand.primary[600]};
    `}

  ${(props) =>
    props.status === "error" &&
    css`
      border-color: ${({ theme }) => theme.colors.feedback.error[600]};
    `}

  ${(props) =>
    props.icon?.class === "left" &&
    css`
      padding-left: ${({ theme }) => theme.spacing(40)};
    `}
  

  ${(props) =>
    props.icon?.class === "right" &&
    css`
      padding-right: ${({ theme }) => theme.spacing(40)};
    `}
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

export const LabelIcon = styled(Icon)`
  font-size: ${({ theme }) => theme.icons.xs};

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

export const HelperIcon = styled(Icon)`
  font-size: ${({ theme }) => theme.icons.xs};

  &.right {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }

  &.left {
    margin-right: ${({ theme }) => theme.spacing(4)};
  }
`;

export const InputIcon = styled(Icon)`
  padding: 2px;
  position: absolute;
  top: 14px;
  font-size: ${({ theme }) => theme.icons.xs};

  &.left {
    left: 12px;
  }

  &.right {
    right: 12px;
  }
`;

export const SuccessIcon = styled(Icon)`
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: ${({ theme }) => theme.icons.sm};
  color: ${({ theme }) => theme.colors.brand.primary[600]};
`;

export const Span = styled.span`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.feedback.error[600]};
`;

export const ErrorIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.spacing(4)};
  font-size: ${({ theme }) => theme.icons.xs};
  color: ${({ theme }) => theme.colors.feedback.error[600]};
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
