import theme from "styles/theme";
import { ReactComponent as SpinnerSvg } from "./assets/spinner.svg";
import * as S from "./styles";

export type Props = {
  strokeColor?: string;
};
function Spinner({ strokeColor = theme.colors.ribonBlue }: Props): JSX.Element {
  return (
    <S.Container>
      <SpinnerSvg stroke={strokeColor} />
    </S.Container>
  );
}

export default Spinner;
