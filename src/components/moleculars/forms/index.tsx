import React from "react";
import * as S from "./styles";

export type Props = {
  children: JSX.Element[] | JSX.Element;
  borderColor?: Record<string, any>;
  textColor?: string;
};

function Form({
  children,
  borderColor,
  textColor,
  ...props
}: Props): JSX.Element {
  return (
    <S.Container textColor={textColor} borderColor={borderColor} {...props}>
      {children}
    </S.Container>
  );
}

export default Form;
