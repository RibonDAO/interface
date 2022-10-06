import React from "react";
import theme from "styles/theme";
import * as S from "./styles";

const { colors } = theme;
const { neutral10 } = colors;

export type Props = {
  text?: string;
  color?: string;
  width?: string;
};
function Divider({
  text,
  color = neutral10,
  width = "100%",
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.Divider color={color} width={width} className="separator">
        {text}
      </S.Divider>
    </S.Container>
  );
}

export default Divider;
