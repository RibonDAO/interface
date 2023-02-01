import React, { ButtonHTMLAttributes } from "react";
import { ReactComponent as RibonIcon } from "assets/icons/ribon.svg";
import theme from "styles/theme";
import { logEvent } from "lib/events";
import * as S from "./styles";

export type onClickType = () => void;

export type Props = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  softDisabled?: boolean;
  borderColor?: string;
  ribons?: boolean;
  ribonsColor?: string;
  leftIcon?: string;
  rightIcon?: string;
  altLeftIconText?: string;
  altRightIconText?: string;
  onClick: onClickType;
  outline?: boolean;
  disabled?: boolean;
  round?: boolean;
  size?: string;
  eventName?: string;
  eventParams?: Record<string, any>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  textColor,
  backgroundColor = theme.colors.green30,
  softDisabled = false,
  borderColor = "",
  ribons = false,
  ribonsColor = theme.colors.green30,
  leftIcon,
  rightIcon,
  onClick,
  altLeftIconText = "left icon",
  altRightIconText = "right icon",
  outline = false,
  disabled = false,
  round = false,
  size = "large",
  eventName,
  eventParams,
  ...props
}: Props): JSX.Element {
  function activeTextColor() {
    if (outline && !textColor) return theme.colors.green30;
    if (softDisabled) return theme.colors.gray30;
    if (!textColor) return theme.colors.neutral10;

    return textColor;
  }

  function activeBackgroundColor() {
    if (outline || softDisabled) return theme.colors.neutral10;
    if (disabled) return theme.colors.gray30;

    return backgroundColor;
  }

  function activeBorderColor() {
    if (outline && !borderColor) return theme.colors.green30;
    if (disabled && !borderColor) return theme.colors.gray30;
    if (softDisabled) return theme.colors.gray20;

    return borderColor;
  }

  function borderRadius() {
    if (round) return "80px";

    return "8px";
  }

  if (eventName) {
    logEvent(eventName, eventParams);
  }

  return (
    <S.Container
      textColor={activeTextColor()}
      backgroundColor={activeBackgroundColor()}
      borderColor={activeBorderColor()}
      ribonsColor={ribonsColor}
      onClick={onClick}
      leftIcon={leftIcon}
      disabled={disabled}
      borderRadius={borderRadius()}
      size={size}
      {...props}
    >
      {leftIcon && <img id="left-icon" src={leftIcon} alt={altLeftIconText} />}
      {text}
      {rightIcon && (
        <img id="right-icon" src={rightIcon} alt={altRightIconText} />
      )}
      {ribons && <RibonIcon />}
    </S.Container>
  );
}
