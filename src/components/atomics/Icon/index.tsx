import React from "react";
import * as S from "./styles";

export type Props = {
  name: string;
  size?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
};

function Icon({
  name,
  color,
  size,
  className,
  onClick,
  ...props
}: Props): JSX.Element {
  return (
    <S.Icon
      color={color}
      size={size}
      {...props}
      onClick={onClick}
      className={`${className} material-symbols-rounded`}
    >
      {name}
    </S.Icon>
  );
}

export default Icon;
