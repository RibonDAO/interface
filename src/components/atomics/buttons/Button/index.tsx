import React, { ButtonHTMLAttributes } from "react";
import { ReactComponent as RibonIcon } from "assets/icons/ribon.svg";
import theme from "styles/theme";
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
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  textColor,
  backgroundColor = theme.colors.ribonBlue,
  softDisabled = false,
  borderColor = "",
  ribons = false,
  ribonsColor = theme.colors.ribonBlue,
  leftIcon,
  rightIcon,
  onClick,
  altLeftIconText = "left icon",
  altRightIconText = "right icon",
  outline = false,
  disabled = false,
  round = false,
  size = "medium",

  ...props
}: Props): JSX.Element {
  function activeTextColor() {
    if (outline && !textColor) return theme.colors.ribonBlue;
    if (softDisabled) return theme.colors.darkGray;
    if (!textColor) return theme.colors.white;

    return textColor;
  }

  function activeBackgroundColor() {
    if (outline || softDisabled) return theme.colors.white;
    if (disabled) return theme.colors.darkGray;

    return backgroundColor;
  }

  function activeBorderColor() {
    if (outline && !borderColor) return theme.colors.ribonBlue;
    if (disabled && !borderColor) return theme.colors.darkGray;
    if (softDisabled) return theme.colors.lightGray;

    return borderColor;
  }

  function borderRadius() {
    if (round) return "80px";

    return "8px";
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
