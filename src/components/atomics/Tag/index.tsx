import React from "react";

import * as S from "./styles";

type Props = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
};

function Tag({ text, textColor, backgroundColor }: Props) {
  return (
    <S.Container>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}

export default Tag;
