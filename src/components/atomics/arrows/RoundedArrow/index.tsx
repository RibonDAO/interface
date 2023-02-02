import theme from "styles/theme";
import * as S from "./styles";

export type Props = {
  color?: string;
  onClick?: (...args: any[]) => void;
  direction?: "top" | "bottom" | "left" | "right";
};

const { primary } = theme.colors.brand;

function RoundedArrow({
  color = primary[300],
  onClick = () => {},
  direction = "right",
}: Props) {
  const transformTable = {
    left: "rotate(0deg)",
    right: "rotate(180deg)",
    top: "rotate(90deg)",
    bottom: "rotate(-90deg)",
  };

  return (
    <S.RoundButton onClick={onClick} color={color}>
      <svg
        style={{ transform: transformTable[direction] }}
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id={`rounded-arrow-${direction}`}
      >
        <path
          d="M20 10.99v2.02H7.879l5.555 5.556L12 20l-8-8 8-8 1.434 1.434L7.88 10.99H20Z"
          fill={color}
        />
      </svg>
    </S.RoundButton>
  );
}

export default RoundedArrow;
