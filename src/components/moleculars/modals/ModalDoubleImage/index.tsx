import React from "react";
import ReactModal from "react-modal";
import theme from "styles/theme";
import Button, { onClickType } from "components/atomics/buttons/Button";
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
  highlightedText?: string;
  zIndex?: number;
  animationData?: Record<any, any>;
  customStyles?: ReactModal.Styles;
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
  primaryButtonCallback = () => {},
  secondaryButtonCallback = () => {},
  onClose = () => {},
  contentLabel,
  highlightedText,
  customStyles,
}: Props): JSX.Element {
  function renderDoubleImage() {
    if (leftImage && rightImage) {
      return (
        <S.ImageContainer>
          <S.LeftImage src={leftImage} alt={leftImageAlt} />
          <S.RightImage src={rightImage} alt={rightImageAlt} />
        </S.ImageContainer>
      );
    }

    return null;
  }

  return (
    <S.ModalWithIcon
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
    </S.ModalWithIcon>
  );
}

export default ModalDoubleImage;
