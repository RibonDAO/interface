import React from "react";
import ReactModal from "react-modal";
import theme from "styles/theme";
import Button, { onClickType } from "components/atomics/buttons/Button";
import * as S from "./styles";
import { defaultCustomStyles } from "../defaultCustomStyles";

export type Props = {
  visible?: boolean;
  image?: string | null;
  title?: string | null;
  titleColor?: string;
  body?: string | null;
  primaryButtonText?: string | null;
  primaryButtonLeftIcon?: string | undefined;
  primaryButtonLink?: string;
  primaryButtonTextColor?: string;
  primaryButtonColor?: string;
  primaryButtonBorderColor?: string;
  primaryButtonCallback?: onClickType;
  secondaryButtonText?: string | null;
  secondaryButtonLeftIcon?: string | undefined;
  secondaryButtonLink?: string;
  secondaryButtonTextColor?: string;
  secondaryButtonColor?: string;
  secondaryButtonBorderColor?: string;
  secondaryButtonCallback?: onClickType;
  contentLabel?: string;
  onClose?: () => void;
  customStyles?: ReactModal.Styles;
};
function ModalImage({
  visible = false,
  image = null,
  title = null,
  titleColor,
  body = null,
  primaryButtonText = null,
  primaryButtonLeftIcon = undefined,
  primaryButtonTextColor = "white",
  primaryButtonColor = theme.colors.mediumGreen,
  primaryButtonBorderColor,
  secondaryButtonText = null,
  secondaryButtonLeftIcon = undefined,
  secondaryButtonTextColor = theme.colors.mediumGray,
  secondaryButtonBorderColor,
  secondaryButtonColor = "white",
  // TODO: discuss with de team to modify linter's rules
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  primaryButtonCallback = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  secondaryButtonCallback = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {},
  contentLabel,
  customStyles,
}: Props): JSX.Element {
  return (
    <S.ModalWithImage
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles || defaultCustomStyles}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {image && <S.Image src={image} alt="modal-image" />}
      <S.Container>
        <S.Title color={titleColor}>{title}</S.Title>
        <S.Body>{body}</S.Body>
        {primaryButtonText && (
          <Button
            leftIcon={primaryButtonLeftIcon}
            text={primaryButtonText}
            textColor={primaryButtonTextColor}
            backgroundColor={primaryButtonColor}
            borderColor={primaryButtonBorderColor}
            onClick={primaryButtonCallback}
          />
        )}
        {secondaryButtonText && (
          <Button
            leftIcon={secondaryButtonLeftIcon}
            text={secondaryButtonText}
            textColor={secondaryButtonTextColor}
            backgroundColor={secondaryButtonColor}
            onClick={secondaryButtonCallback}
            borderColor={secondaryButtonBorderColor}
          />
        )}
      </S.Container>
    </S.ModalWithImage>
  );
}

export default ModalImage;
