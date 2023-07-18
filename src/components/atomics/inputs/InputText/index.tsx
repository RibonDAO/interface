import React from "react";
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
  mask?: string;
  maskPlaceholder?: string;
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
  mask,
  ...props
}: Props): JSX.Element {
  return (
    <S.Container>
      {label && (
        <S.LabelContainer>
          {label.icon && label.icon.class === "left" && (
            <S.LabelIcon name={label.icon.name} className={label.icon.class} />
          )}
          <S.Label>
            {required && <span>*</span>}
            {label.text}
          </S.Label>
          {label.icon && label.icon.class === "right" && (
            <S.LabelIcon className={label.icon.class} name={label.icon.name} />
          )}
        </S.LabelContainer>
      )}
      <S.Container>
        <S.Input
          placeholder={placeholder}
          mask={mask ?? ""}
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
          textColor={textColor}
          borderColor={borderColor}
          status={status}
          icon={icon}
          {...props}
        />
        {icon && <S.InputIcon className={icon.class} name={icon.name} />}
        {status === "success" && <S.SuccessIcon name="check_circle" />}
        {errorMessage && status === "error" && (
          <S.ErrorContainer>
            <S.ErrorIcon name="dangerous" />
            <S.Span>{errorMessage}</S.Span>
          </S.ErrorContainer>
        )}
      </S.Container>
      {helper && (
        <S.HelperContainer>
          {helper.icon && helper.icon.class === "left" && (
            <S.HelperIcon
              className={helper.icon.class}
              name={helper.icon.name}
            />
          )}
          <S.Helper>{helper.text}</S.Helper>
          {helper.icon && helper.icon.class === "right" && (
            <S.HelperIcon
              className={helper.icon.class}
              name={helper.icon.name}
            />
          )}
        </S.HelperContainer>
      )}
    </S.Container>
  );
}

export default InputText;
