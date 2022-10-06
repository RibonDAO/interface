import { useState } from "react";
import Switch from "react-switch";
import theme from "styles/theme";
import * as S from "./styles";

const { colors } = theme;
const { green30, neutral10, gray30 } = colors;

export type Props = {
  leftText: string;
  rightText: string;
  onSwitch?: (checked: boolean) => void;
  initialCheckState?: boolean;
};
function ButtonSwitch({
  leftText,
  rightText,
  onSwitch,
  initialCheckState = false,
}: Props): JSX.Element {
  const [checked, setChecked] = useState(initialCheckState);

  const handleChange = () => {
    setChecked(!checked);
    if (onSwitch) onSwitch(checked);
  };

  return (
    <S.Container>
      <S.BoxIcon>
        <S.Text color={checked ? gray30 : green30}>{leftText}</S.Text>
      </S.BoxIcon>
      <S.ContainerSwitch>
        <Switch
          id="switch"
          onChange={handleChange}
          checked={checked}
          offColor={green30}
          onColor={green30}
          onHandleColor={neutral10}
          offHandleColor={neutral10}
          handleDiameter={15}
          checkedIcon={false}
          uncheckedIcon={false}
          width={30}
          height={19}
        />
      </S.ContainerSwitch>
      <S.BoxIcon>
        <S.Text color={checked ? green30 : gray30}>{rightText}</S.Text>
      </S.BoxIcon>
    </S.Container>
  );
}

export default ButtonSwitch;
