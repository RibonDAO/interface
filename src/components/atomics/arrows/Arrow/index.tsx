import theme from "styles/theme";
import * as S from "./styles";

const { colors } = theme;
const { neutral10 } = colors;

export type Props = {
  disabled: boolean;
  // eslint-disable-next-line
  onClick: (...args: any[]) => void;
  direction: "left" | "right";
  color?: string;
};

function Arrow({
  disabled,
  onClick,
  direction,
  color = neutral10,
}: Props): JSX.Element {
  return direction === "right" ? (
    <S.ArrowRightImage
      id="arrow-right"
      disabled={disabled}
      onClick={onClick}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M8.33334 16.59L13.1042 12L8.33334 7.41L9.80209 6L16.0521 12L9.80209 18L8.33334 16.59Z" />
    </S.ArrowRightImage>
  ) : (
    <S.ArrowLeftImage
      id="arrow-left"
      disabled={disabled}
      onClick={onClick}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.6667 7.41L11.8958 12L16.6667 16.59L15.1979 18L8.94791 12L15.1979 6L16.6667 7.41Z" />
    </S.ArrowLeftImage>
  );
}

export default Arrow;
