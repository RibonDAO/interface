import { useRef } from "react";
import { theme } from "@ribon.io/shared/styles";
import * as S from "./styles";

export type Props = {
  value: number;
  min: number;
  max: number;
  showPercentageLabel?: boolean;
  color?: string;
  textColor?: string;
};

const { brand, neutral } = theme.colors;
function ProgressBar({
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  min,
  max,
  showPercentageLabel = false,
  color = brand.primary[300],
  textColor = neutral[800],
}: Props): JSX.Element {
  const percentage = (value / max) * 100;

  const wrapperRef = useRef(null);
  return (
    <S.Container ref={wrapperRef}>
      <S.Progress progress={percentage} color={color} />
      <S.Text color={textColor}>
        {showPercentageLabel ? `${percentage.toFixed(0)}%` : `${value}/${max}`}
      </S.Text>
    </S.Container>
  );
}

export default ProgressBar;
