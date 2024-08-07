import "rc-slider/assets/index.css";
import { useState } from "react";
import Slider from "rc-slider";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import * as S from "./styles";

export type Props = {
  rangeSize: number;
  setValue: (value: number) => void;
  step: number;
};

function SliderButton({ rangeSize, setValue, step }: Props): JSX.Element {
  const [sliderValue, setSliderValue] = useState<number>(step);

  const handleSliderChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setSliderValue(Math.round(newValue));
    setValue(Math.round(newValue));
  };

  const handleButtonClick = (increment: number) => {
    const newValue = sliderValue + increment;
    if (newValue < 1 || newValue > rangeSize) return;
    setSliderValue(newValue);
    setValue(newValue);
  };

  const minimumValue = rangeSize < 2 * step ? 0 : step;
  const maximumValue = Math.floor(rangeSize / step) * step;

  const minusDisabled = sliderValue <= step;
  const plusDisabled = sliderValue + step > rangeSize;

  const minusBorderColor = minusDisabled
    ? theme.colors.neutral[400]
    : theme.colors.brand.primary[600];

  const plusBorderColor = plusDisabled
    ? theme.colors.neutral[400]
    : theme.colors.brand.primary[600];

  const customStyles = {
    rail: { backgroundColor: theme.colors.neutral[200] },
    track: { backgroundColor: theme.colors.brand.primary[600] },
    handle: {
      border: `2px solid ${theme.colors.neutral10}`,
      backgroundColor: theme.colors.brand.primary[600],
      boxShadow: "none",
      opacity: "1",
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  };

  return (
    <S.Container>
      <S.Button
        onClick={() => handleButtonClick(-step)}
        disabled={minusDisabled}
        style={{ borderColor: minusBorderColor }}
        data-testid="removeButton"
      >
        <Icon
          name="remove"
          size="24"
          color={
            minusDisabled
              ? theme.colors.neutral[400]
              : theme.colors.brand.primary[600]
          }
        />
      </S.Button>
      <S.SliderContainer>
        <Slider
          min={minimumValue}
          max={maximumValue}
          step={step}
          styles={customStyles}
          value={sliderValue}
          onChange={handleSliderChange}
          disabled={rangeSize < 2 * step}
        />
      </S.SliderContainer>
      <S.Button
        data-testid="addButton"
        onClick={() => handleButtonClick(step)}
        disabled={plusDisabled}
        style={{ borderColor: plusBorderColor }}
      >
        <Icon
          name="add"
          size="24"
          color={
            plusDisabled
              ? theme.colors.neutral[400]
              : theme.colors.brand.primary[600]
          }
        />
      </S.Button>
    </S.Container>
  );
}

export default SliderButton;
