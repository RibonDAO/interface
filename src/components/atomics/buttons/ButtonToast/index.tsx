import CloseIconOrange from "assets/icons/close-icon-orange.svg";
import theme from "styles/theme";
import { useEffect, useState } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import { newLogEvent } from "lib/events";
import * as S from "./styles";

export type Props = {
  text: string;
  onClick: () => void;
  leftIcon: string;
  backgroundColor?: string;
  textColor?: string;
  eventName?: string;
  eventParams?: any;
};

function ButtonToast({
  text,
  onClick,
  leftIcon,
  backgroundColor = theme.colors.brand.secondary[300],
  textColor = theme.colors.brand.secondary[700],
  eventName,
  eventParams,
}: Props): JSX.Element {
  const [collapsed, setCollapsed] = useState(true);
  const [logged, setLogged] = useState(false);

  const { isMobile } = useBreakpoint();

  const handleClick = () => {
    if (isMobile && collapsed) return setCollapsed(true);
    if (eventName && eventParams) newLogEvent("click", eventName, eventParams);
    return onClick();
  };

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (logged) return;
    if (!eventName) return;

    if (isMobile && !collapsed) {
      newLogEvent("view", eventName, eventParams);
      setLogged(true);
    } else if (!isMobile) {
      newLogEvent("view", eventName, eventParams);
      setLogged(true);
    }
  }, [collapsed]);

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
