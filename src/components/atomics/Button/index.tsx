import React, { ButtonHTMLAttributes } from "react";
import { ReactComponent as RibonIcon } from "assets/icons/ribon.svg";
import theme from "styles/theme";
import * as S from "./styles";

export type onClickType = () => void;

export type Props = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  ribons?: boolean;
  ribonsColor?: string;
  leftIcon?: string;
  altLeftIconText?: string;
  onClick: onClickType;
  outline?: boolean;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  textColor = theme.colors.ribonWhite,
  backgroundColor = theme.colors.ribonBlue,
  borderColor = "",
  ribons = false,
  ribonsColor = theme.colors.ribonBlue,
  leftIcon,
  onClick,
  altLeftIconText = "left icon",
  outline = false,
  disabled = false,
  ...props
}: Props): JSX.Element {
  function activeTextColor() {
    if (outline) return theme.colors.ribonBlue;
    return textColor;
  }

  function activeBackgroundColor() {
    if (outline) return theme.colors.ribonBlue;
    if (disabled) return theme.colors.darkGray;

    return backgroundColor;
  }

  return (
    <S.Container
      textColor={activeTextColor()}
      backgroundColor={activeBackgroundColor()}
      borderColor={outline ? theme.colors.ribonBlue : borderColor}
      ribonsColor={ribonsColor}
      onClick={onClick}
      leftIcon={leftIcon}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <img id="left-icon" src={leftIcon} alt={altLeftIconText} />}
      {text}
      {ribons && <RibonIcon />}
    </S.Container>
  );
}
