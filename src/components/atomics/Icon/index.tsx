/* eslint-disable react/require-default-props */
import { useState } from "react";
import * as S from "./styles";

export type IconProps = {
  id?: string;
  name: string;
  size?: string;
  color?: string;
  backgroundColor?: string;
  hoveredBackgroundColor?: string;
  className?: string;
  withCircle?: boolean;
  onClick?: () => void;
  alt?: string;
};

function Icon({
  id,
  name,
  color,
  backgroundColor,
  hoveredBackgroundColor,
  size,
  className,
  onClick,
  withCircle,
  alt,
  ...props
}: IconProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const hoverBackground = hoveredBackgroundColor || backgroundColor;

  return (
    <S.Icon
      id={id}
      color={color}
      backgroundColor={isHovered ? hoverBackground : backgroundColor}
      size={size}
      {...props}
      onClick={onClick}
      className={`${className} material-symbols-rounded`}
      data-testid={`icon-${name}`}
      withCircle={withCircle}
      aria-label={alt}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name}
    </S.Icon>
  );
}

export default Icon;
