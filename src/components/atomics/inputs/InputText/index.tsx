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
}: Props): JSX.Element {
  return (
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
      />
    </S.Container>
  );
}

export default InputText;
