import { theme } from "@ribon.io/shared/styles";
import { useEffect, useState } from "react";
import Icon from "components/atomics/Icon";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

export type Props = {
  text: string;
  sectionStyle?: any;
  lineThroughOnChecked?: boolean;
  navigationCallback?: string;
  disabled?: boolean;
  checked?: boolean;
  onClick?: (...args: any[]) => void;
  onCheck?: (...args: any[]) => void;
  state?: any;
};

function CheckBox({
  text,
  lineThroughOnChecked = false,
  sectionStyle = {},
  navigationCallback,
  disabled,
  checked = false,
  state,
  onClick = () => {},
  onCheck = () => {},
}: Props): JSX.Element {
  const [isChecked, setChecked] = useState(checked);

  const { navigateTo } = useNavigation();

  const onPressHandler = () => {
    if (!disabled) {
      setChecked(!isChecked);
      onCheck();
    }
  };

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <S.Container style={sectionStyle}>
      <S.CheckboxContainer onClick={onPressHandler}>
        <S.Checkbox isChecked={isChecked}>
          {isChecked && (
            <Icon name="check" color={theme.colors.neutral10} size="20px" />
          )}
        </S.Checkbox>
        <S.Paragraph isChecked={isChecked && lineThroughOnChecked}>
          {text}
        </S.Paragraph>
      </S.CheckboxContainer>
      {navigationCallback && (
        <S.NavigationButton
          onClick={() => {
            onClick();
            navigateTo({ pathname: navigationCallback, state });
          }}
        >
          <Icon
            name="arrow_forward_ios"
            color={theme.colors.brand.primary[500]}
            size="20px"
          />
        </S.NavigationButton>
      )}
    </S.Container>
  );
}

export default CheckBox;
