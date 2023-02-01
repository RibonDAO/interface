import React from "react";
import theme from "styles/theme";
import * as S from "./styles";

export type Props = {
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: any) => void;
  color?: string;
};

const { primary } = theme.colors.brand;

function InputRange({
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled = false,
  color = primary[300],
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
        color={color}
      />
    </S.Container>
  );
}

export default InputRange;
