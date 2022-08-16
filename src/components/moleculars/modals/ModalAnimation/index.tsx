import React from "react";
import ReactModal from "react-modal";
import { defaultCustomStyles } from "../defaultCustomStyles";
import * as S from "./styles";

export type Props = {
  visible?: boolean;
  text?: string;
  onClose?: () => void;
  textOrigin?: string;
  textDestiny?: string;
  iconOrigin?: string;
  iconDestiny?: string;
  customStyles?: ReactModal.Styles;
  icon?: string;
};
function ModalAnimation({
  visible = false,
  text,
  onClose = () => {},
  customStyles,
  textOrigin,
  textDestiny,
  iconOrigin,
  iconDestiny,
  icon,
}: Props): JSX.Element {
  return (
    <S.BlankModal
      isOpen={visible}
      onRequestClose={onClose}
      style={{ ...defaultCustomStyles, ...customStyles }}
      ariaHideApp={false}
    >
      <S.AnimationContainer>
        <S.AnimationContent>
          <S.Circle>
            <S.Icon src={iconOrigin} alt="iconOrigin" />
          </S.Circle>
          <S.IconDescription>{textOrigin}</S.IconDescription>
        </S.AnimationContent>
        <S.AnimationContent>
          <S.ProgressBar>
            <S.ProgressImg src={icon} alt="icon" />
          </S.ProgressBar>
        </S.AnimationContent>
        <S.AnimationContent>
          <S.Circle>
            <S.Icon src={iconDestiny} alt="iconDestiny" />
          </S.Circle>
          <S.IconDescription>{textDestiny}</S.IconDescription>
        </S.AnimationContent>
      </S.AnimationContainer>
      <S.Text>{text}</S.Text>
    </S.BlankModal>
  );
}

export default ModalAnimation;
