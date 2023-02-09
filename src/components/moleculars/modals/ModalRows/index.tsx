import Button, { ButtonProps } from "components/atomics/buttons/Button";
import LottieAnimation from "components/atomics/LottieAnimation";
import { newLogEvent } from "lib/events";
import { useState } from "react";
import theme from "styles/theme";
import { defaultCustomStyles } from "../defaultCustomStyles";
import * as S from "./styles";

type RowProps = {
  id: number;
  icon: string;
  text: string;
};

export type Props = {
  visible?: boolean;
  icon?: string | null;
  biggerIcon?: boolean;
  roundIcon?: boolean;
  altIcon?: string;
  rowsContent?: Record<any, any> | null;
  title?: string | null;
  body?: string | null;
  titleColor?: string;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  contentLabel?: string;
  children?: JSX.Element[] | null;
  onClose?: () => void;
  animationData?: Record<any, any>;
  eventName?: string;
  eventParams?: Record<string, any>;
};

function ModalRows({
  visible = false,
  icon = null,
  biggerIcon = false,
  roundIcon = false,
  altIcon = "icon",
  rowsContent = null,
  children = null,
  title = null,
  body = null,
  titleColor,
  primaryButton,
  secondaryButton,
  onClose = () => {},
  contentLabel,
  animationData,
  eventName,
  eventParams,
}: Props): JSX.Element {
  const [logged, SetLogged] = useState(false);

  if (visible && eventName && !logged) {
    newLogEvent("view", eventName, eventParams);
    SetLogged(true);
  }

  function renderIcon() {
    if (biggerIcon) return icon && <S.BiggerIcon src={icon} alt={altIcon} />;
    if (roundIcon) return icon && <S.RoundIcon src={icon} alt={altIcon} />;

    return icon && <S.Icon src={icon} />;
  }
  return (
    <S.ModalWithIcon
      isOpen={visible}
      onRequestClose={onClose}
      style={defaultCustomStyles}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {renderIcon()}
      {animationData && (
        <S.Animation>
          <LottieAnimation
            animationData={animationData}
            width={200}
            height={150}
          />
        </S.Animation>
      )}
      <S.RowsModalContainer>
        <S.Title color={titleColor}>{title}</S.Title>
        {body && <S.Body>{body}</S.Body>}
        <S.RowsModalSection>
          {rowsContent &&
            rowsContent.map((row: RowProps) => (
              <S.RowsModalRow key={row.id}>
                {row.icon && <S.RowsModalIcon src={row.icon} />}
                <S.RowsModalText>{row.text}</S.RowsModalText>
              </S.RowsModalRow>
            ))}
          {children}
        </S.RowsModalSection>
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
      </S.RowsModalContainer>
    </S.ModalWithIcon>
  );
}

export default ModalRows;
