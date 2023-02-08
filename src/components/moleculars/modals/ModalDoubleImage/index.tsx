import React, { useState } from "react";
import ReactModal from "react-modal";
import Button, { ButtonProps } from "components/atomics/buttons/Button";
import { newLogEvent } from "lib/events";
import * as S from "./styles";
import { defaultCustomStyles } from "../defaultCustomStyles";

export type Props = {
  visible?: boolean;
  rightImage?: string | null;
  leftImage?: string | null;
  leftImageAlt?: string;
  rightImageAlt?: string;
  title?: string | null;
  titleColor?: string;
  body?: string | null;
  primaryButton?: ButtonProps | null;
  secondaryButton?: ButtonProps | null;
  contentLabel?: string;
  onClose?: () => void;
  highlightedText?: string;
  zIndex?: number;
  animationData?: Record<any, any>;
  customStyles?: ReactModal.Styles;
  eventName?: string;
  eventParams?: Record<string, any>;
};

function ModalDoubleImage({
  visible = false,
  leftImage = null,
  rightImage = null,
  leftImageAlt = "leftImageAlt",
  rightImageAlt = "rightImageAlt",
  title = null,
  titleColor,
  body = null,
  primaryButton = null,
  secondaryButton = null,
  onClose = () => {},
  contentLabel,
  highlightedText,
  customStyles,
  eventName,
  eventParams,
}: Props): JSX.Element {
  const [logged, SetLogged] = useState(false);

  if (visible && eventName && !logged) {
    newLogEvent("view", eventName, eventParams);
    SetLogged(true);
  }

  function renderDoubleImage() {
    const hasDoubleImage = Boolean(leftImage && rightImage);

    return (
      <S.ImageContainer>
        {leftImage && (
          <S.LeftImage
            src={leftImage}
            alt={leftImageAlt}
            hasAdjacent={hasDoubleImage}
          />
        )}
        {rightImage && (
          <S.RightImage
            src={rightImage}
            alt={rightImageAlt}
            hasAdjacent={hasDoubleImage}
          />
        )}
      </S.ImageContainer>
    );
  }

  return (
    <S.ModalWithDoubleImage
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles || defaultCustomStyles}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {renderDoubleImage()}
      {title && <S.Title color={titleColor}>{title}</S.Title>}
      {body && (
        <S.Body>
          {body}
          {highlightedText && (
            <S.HighlightedText>{highlightedText}</S.HighlightedText>
          )}
        </S.Body>
      )}
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
          textColor={secondaryButton.textColor}
          backgroundColor={secondaryButton.backgroundColor}
          onClick={secondaryButton.onClick}
          borderColor={secondaryButton.borderColor}
          eventName={secondaryButton.eventName}
          eventParams={secondaryButton.eventParams}
        />
      )}
    </S.ModalWithDoubleImage>
  );
}

export default ModalDoubleImage;
