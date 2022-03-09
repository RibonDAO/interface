import { Styles } from "react-modal";
import { defaultCustomStyles } from "../defaultCustomStyles";
import * as S from "./styles";

export type Props = {
  visible?: boolean;
  contentLabel?: string;
  children?: JSX.Element[] | JSX.Element | null;
  onClose?: () => void;
  customStyles?: Styles;
};

function ModalBlank({
  visible = false,
  children = null,
  onClose = () => {},
  contentLabel,
  customStyles,
}: Props): JSX.Element {
  return (
    <S.BlankModal
      isOpen={visible}
      onRequestClose={onClose}
      style={{ ...defaultCustomStyles, ...customStyles }}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {children}
    </S.BlankModal>
  );
}

export default ModalBlank;
