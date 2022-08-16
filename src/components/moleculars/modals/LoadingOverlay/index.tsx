import React from "react";
import Spinner from "components/atomics/Spinner";
import * as S from "./styles";
import ModalBlank from "../ModalBlank";

export type Props = {
  text?: string;
  visible?: boolean;
};
function LoadingOverlay({ text, visible = false }: Props): JSX.Element {
  return (
    <S.Container>
      <ModalBlank visible={visible}>
        <S.CenterDiv>
          <Spinner />
          {text && <S.Message>{text}</S.Message>}
        </S.CenterDiv>
      </ModalBlank>
    </S.Container>
  );
}

export default LoadingOverlay;
