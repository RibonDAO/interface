import CloseIconOrange from "assets/icons/close-icon-orange.svg";
import theme from "styles/theme";
import { useState } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import * as S from "./styles";

export type Props = {
  text: string;
  onClick: () => void;
  leftIcon: string;
  backgroundColor?: string;
  textColor?: string;
};

function ButtonToast({
  text,
  onClick,
  leftIcon,
  backgroundColor = theme.colors.orange20,
  textColor = theme.colors.orange40,
}: Props): JSX.Element {
  const [collapsed, setCollapsed] = useState(true);

  const { isMobile } = useBreakpoint();

  const handleClick = () => {
    if (isMobile && collapsed) return setCollapsed(true);

    return onClick();
  };

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <S.Container collapsed={isMobile && collapsed}>
      <S.CtaContainer>
        <S.Button
          onClick={handleClick}
          textColor={textColor}
          backgroundColor={backgroundColor}
        >
          <S.LeftIcon src={leftIcon} alt="download" />
          <span>{text}</span>
        </S.Button>
      </S.CtaContainer>

      <S.ToggleButton
        textColor={textColor}
        backgroundColor={backgroundColor}
        onClick={handleToggle}
      >
        <S.LeftIcon src={collapsed ? leftIcon : CloseIconOrange} alt="close" />
      </S.ToggleButton>
    </S.Container>
  );
}

export default ButtonToast;
