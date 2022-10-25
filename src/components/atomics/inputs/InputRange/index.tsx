import React from "react";
import * as S from "./styles";

export type Props = {
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: any) => void;
};

function InputRange({
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled = false,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.Input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        disabled={disabled}
      />
    </S.Container>
  );
}

export default InputRange;
