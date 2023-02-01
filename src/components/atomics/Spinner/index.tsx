import theme from "styles/theme";
import { ReactComponent as SpinnerSvg } from "./assets/spinner.svg";
import * as S from "./styles";

export type Props = {
  strokeColor?: string;
  size?: string;
};

const { primary } = theme.colors.brand;

function Spinner({
  strokeColor = primary[300],
  size = "18",
}: Props): JSX.Element {
  return (
    <S.Container data-testid="spinner">
      <SpinnerSvg stroke={strokeColor} width={size} height={size} />
    </S.Container>
  );
}

export default Spinner;
