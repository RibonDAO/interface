import { useState } from "react";
import Switch from "react-switch";
import theme from "styles/theme";
import * as S from "./styles";

const { colors } = theme;
const { ribonBlue, ribonWhite, darkGray } = colors;

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
        <S.Text color={checked ? darkGray : ribonBlue}>{leftText}</S.Text>
      </S.BoxIcon>
      <S.ContainerSwitch>
        <Switch
          id="switch"
          onChange={handleChange}
          checked={checked}
          offColor={ribonBlue}
          onColor={ribonBlue}
          onHandleColor={ribonWhite}
          offHandleColor={ribonWhite}
          handleDiameter={15}
          checkedIcon={false}
          uncheckedIcon={false}
          width={30}
          height={19}
        />
      </S.ContainerSwitch>
      <S.BoxIcon>
        <S.Text color={checked ? ribonBlue : darkGray}>{rightText}</S.Text>
      </S.BoxIcon>
    </S.Container>
  );
}

export default ButtonSwitch;
