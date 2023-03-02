import React from "react";
import * as S from "./styles";

export type Props = {
  name: string;
  size?: string;
  color?: string;
  className?: string;
};

function Icon({ name, color, size, className, ...props }: Props): JSX.Element {
  return (
    <S.Icon
      color={color}
      size={size}
      {...props}
      className={`${className} material-symbols-rounded`}
    >
      {name}
    </S.Icon>
  );
}

export default Icon;
