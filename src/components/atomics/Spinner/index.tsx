import theme from "styles/theme";
import { ReactComponent as SpinnerSvg } from "./assets/spinner.svg";
import * as S from "./styles";

export type Props = {
  strokeColor?: string;
  size?: string;
};
function Spinner({
  strokeColor = theme.colors.ribonBlue,
  size = "18",
}: Props): JSX.Element {
  return (
    <S.Container data-testid="spinner">
      <SpinnerSvg stroke={strokeColor} width={size} height={size} />
    </S.Container>
  );
}

export default Spinner;
