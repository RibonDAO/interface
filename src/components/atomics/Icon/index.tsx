/* eslint-disable react/require-default-props */
import React from "react";
import * as S from "./styles";

export type IconProps = {
  id?: string;
  name: string;
  size?: string;
  color?: string;
  className?: string;
  withCircle?: boolean;
  onClick?: () => void;
  alt?: string;
};

function Icon({
  id,
  name,
  color,
  size,
  className,
  onClick,
  withCircle,
  alt,
  ...props
}: IconProps): JSX.Element {
  return (
    <S.Icon
      id={id}
      color={color}
      size={size}
      {...props}
      onClick={onClick}
      className={`${className} material-symbols-rounded`}
      data-testid={`icon-${name}`}
      withCircle={withCircle}
      aria-label={alt}
    >
      {name}
    </S.Icon>
  );
}

export default Icon;
