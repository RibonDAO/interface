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
  altLeftIconText?: string;
  onClick: onClickType;
  outline?: boolean;
  disabled?: boolean;
  round?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  textColor = theme.colors.ribonWhite,
  backgroundColor = theme.colors.ribonBlue,
  softDisabled = false,
  borderColor = "",
  ribons = false,
  ribonsColor = theme.colors.ribonBlue,
  leftIcon,
  onClick,
  altLeftIconText = "left icon",
  outline = false,
  disabled = false,
  round = false,

  ...props
}: Props): JSX.Element {
  function activeTextColor() {
    if (outline && !textColor) return theme.colors.ribonBlue;
    if (softDisabled) return theme.colors.darkGray;
    return textColor;
  }

  function activeBackgroundColor() {
    if (outline || softDisabled) return theme.colors.ribonWhite;
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
      {...props}
    >
      {leftIcon && <img id="left-icon" src={leftIcon} alt={altLeftIconText} />}
      {text}
      {ribons && <RibonIcon />}
    </S.Container>
  );
}
