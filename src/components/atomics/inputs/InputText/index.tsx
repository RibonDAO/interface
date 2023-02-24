import React from "react";
import ErrorIcon from "assets/icons/input-error-icon.svg";
import SuccessIcon from "assets/icons/input-success-icon.svg";
import * as S from "./styles";

export type Props = {
  name: string;
  value?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  disabled?: boolean;
  autofill?: string;
  onChange?: (value: any) => void;
  status?: string;
  errorMessage?: string;
  icon?: Record<string, any>;
  label?: Record<string, any>;
  helper?: Record<string, any>;
  borderColor?: Record<string, any>;
  textColor?: string;
};

function InputText({
  name,
  value,
  type,
  placeholder,
  onChange,
  required,
  maxLength,
  minLength,
  disabled,
  autofill,
  status,
  errorMessage,
  icon,
  label,
  helper,
  borderColor,
  textColor,
  ...props
}: Props): JSX.Element {
  return (
    <S.Container>
      {label && (
        <S.LabelContainer>
          {label.icon && label.icon.class === "left" && (
            <S.LabelIcon src={label.icon.url} className={label.icon.class} />
          )}
          <S.Label>
            {required && <span>*</span>}
            {label.text}
          </S.Label>
          {label.icon && label.icon.class === "right" && (
            <S.LabelIcon src={label.icon.url} className={label.icon.class} />
          )}
        </S.LabelContainer>
      )}
      <S.Container>
        <S.Input
          placeholder={placeholder}
          type={type}
          name={name}
          aria-label={name}
          value={value}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autofill}
          className={`${status} icon-${icon?.class}`}
          textColor={textColor}
          borderColor={borderColor}
          {...props}
        />
        {icon && <S.Icon src={icon.url} className={icon.class} />}
        {status === "success" && (
          <S.SuccessIcon alt="right-icon" src={SuccessIcon} />
        )}
        {errorMessage && status === "error" && (
          <S.ErrorContainer>
            <S.ErrorIcon src={ErrorIcon} />
            <S.Span>{errorMessage}</S.Span>
          </S.ErrorContainer>
        )}
      </S.Container>
      {helper && (
        <S.HelperContainer>
          {helper.icon && helper.icon.class === "left" && (
            <S.HelperIcon src={helper.icon.url} className={helper.icon.class} />
          )}
          <S.Helper>{helper.text}</S.Helper>
          {helper.icon && helper.icon.class === "right" && (
            <S.HelperIcon src={helper.icon.url} className={helper.icon.class} />
          )}
        </S.HelperContainer>
      )}
    </S.Container>
  );
}

export default InputText;
