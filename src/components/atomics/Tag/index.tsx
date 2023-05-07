/* eslint-disable react/require-default-props */
import React from "react";

import * as S from "./styles";

type Props = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
};

function Tag({ text, textColor, backgroundColor }: Props) {
  return (
    <S.Container backgroundColor={backgroundColor}>
      <S.Text textColor={textColor}>{text}</S.Text>
    </S.Container>
  );
}

export default Tag;
