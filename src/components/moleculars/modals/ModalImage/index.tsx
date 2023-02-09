import React, { useState } from "react";
import ReactModal from "react-modal";
import Button, { ButtonProps } from "components/atomics/buttons/Button";
import theme from "styles/theme";
import { newLogEvent } from "lib/events";
import * as S from "./styles";
import { defaultCustomStyles } from "../defaultCustomStyles";

export type Props = {
  visible?: boolean;
  image?: string | null;
  title?: string | null;
  titleColor?: string;
  body?: string | null;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  contentLabel?: string;
  onClose?: () => void;
  customStyles?: ReactModal.Styles;
  eventName?: string;
  eventParams?: Record<string, any>;
};

function ModalImage({
  visible = false,
  image = null,
  title = null,
  titleColor,
  body = null,
  primaryButton,
  secondaryButton,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {},
  contentLabel,
  customStyles,
  eventName,
  eventParams,
}: Props): JSX.Element {
  const [logged, SetLogged] = useState(false);

  if (visible && eventName && !logged) {
    newLogEvent("view", eventName, eventParams);
    SetLogged(true);
  }

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
        {primaryButton && (
          <Button
            leftIcon={primaryButton.leftIcon}
            text={primaryButton.text}
            textColor={primaryButton.textColor}
            backgroundColor={primaryButton.color}
            borderColor={primaryButton.borderColor}
            onClick={primaryButton.onClick}
            eventName={primaryButton.eventName}
            eventParams={primaryButton.eventParams}
          />
        )}
        {secondaryButton && (
          <Button
            leftIcon={secondaryButton.leftIcon}
            text={secondaryButton.text}
            textColor={secondaryButton.textColor || theme.colors.neutral[500]}
            backgroundColor={
              secondaryButton.backgroundColor || theme.colors.neutral10
            }
            onClick={secondaryButton.onClick}
            borderColor={secondaryButton.borderColor}
            eventName={secondaryButton.eventName}
            eventParams={secondaryButton.eventParams}
          />
        )}
      </S.Container>
    </S.ModalWithImage>
  );
}

export default ModalImage;
