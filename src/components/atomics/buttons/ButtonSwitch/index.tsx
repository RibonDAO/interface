import { useState } from "react";
import Switch from "react-switch";
import theme from "styles/theme";
import * as S from "./styles";

const { colors } = theme;
const { neutral10 } = colors;
const { primary } = theme.colors.brand;

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
        <S.Text color={checked ? colors.neutral[500] : primary[300]}>
          {leftText}
        </S.Text>
      </S.BoxIcon>
      <S.ContainerSwitch>
        <Switch
          id="switch"
          onChange={handleChange}
          checked={checked}
          offColor={primary[300]}
          onColor={primary[300]}
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
        <S.Text color={checked ? primary[300] : colors.neutral[500]}>
          {rightText}
        </S.Text>
      </S.BoxIcon>
    </S.Container>
  );
}

export default ButtonSwitch;
