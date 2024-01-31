import "rc-slider/assets/index.css";
import { useState } from "react";
import Slider from "rc-slider";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import * as S from "./styles";

export type Props = {
  rangeSize: number;
  setValue: (value: number) => void;
};

function SliderButton({ rangeSize, setValue }: Props): JSX.Element {
  const [sliderValue, setSliderValue] = useState<number>(1);

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

  const minusDisabled = sliderValue <= 1;
  const plusDisabled = sliderValue >= rangeSize;

  const minusBorderColor = minusDisabled
    ? theme.colors.neutral[400]
    : theme.colors.brand.primary[600];

  const plusBorderColor = plusDisabled
    ? theme.colors.neutral[400]
    : theme.colors.brand.primary[600];

  return (
    <S.Container>
      <S.Button
        onClick={() => handleButtonClick(-1)}
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
          min={rangeSize === 1 ? 0 : 1}
          max={rangeSize}
          step={1}
          railStyle={{ backgroundColor: theme.colors.neutral[200] }}
          trackStyle={{ backgroundColor: theme.colors.brand.primary[600] }}
          handleStyle={{ borderColor: theme.colors.brand.primary[600] }}
          value={sliderValue}
          onChange={handleSliderChange}
          disabled={rangeSize === 1}
        />
      </S.SliderContainer>
      <S.Button
        data-testid="addButton"
        onClick={() => handleButtonClick(1)}
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
