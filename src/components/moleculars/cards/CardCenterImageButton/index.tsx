import Button from "components/atomics/buttons/Button";
import securityIcon from "assets/icons/security-mark-icon.svg";
import infoIcon from "assets/icons/info-icon-white.svg";
import { theme } from "@ribon.io/shared/styles";
import * as S from "./styles";

export type Props = {
  image: string;
  title?: string | JSX.Element;
  buttonText: string;
  onClickButton: () => void;
  onClickImage?: () => void;
  softDisabled?: boolean;
  disabled?: boolean;
  infoTextTop?: string;
  infoTextBottom?: string;
  fullWidth?: boolean;
  infoText?: string;
  secondButtonProps?: {
    text: string;
    onClick: () => void;
    visible: boolean;
  };
};
function CardCenterImageButton({
  image,
  title,
  buttonText,
  onClickButton,
  onClickImage,
  disabled,
  softDisabled,
  infoTextTop,
  infoTextBottom,
  fullWidth = false,
  infoText,
  secondButtonProps,
}: Props): JSX.Element {
  return (
    <S.Container fullWidth={fullWidth}>
      <S.ImageSection onClick={onClickImage}>
        {infoText && (
          <S.InfoText>
            <img src={infoIcon} alt="info" />
            {infoText}
          </S.InfoText>
        )}
        <S.Image src={image} alt="image" />
        <S.ImageDescription>{title}</S.ImageDescription>

        <S.DarkStroke />
      </S.ImageSection>

      <S.ContentSection>
        <S.InfoContainer>
          {infoTextTop && (
            <S.InfoIcon>
              <S.Info>{infoTextTop}</S.Info>
              <S.Icon src={securityIcon} />
            </S.InfoIcon>
          )}
          {infoTextBottom && <S.Info>{infoTextBottom}</S.Info>}
        </S.InfoContainer>
        <S.ButtonContainer>
          <Button
            onClick={onClickButton}
            text={buttonText}
            softDisabled={softDisabled}
            disabled={disabled}
            backgroundColor={theme.colors.brand.primary[600]}
          />
          {secondButtonProps?.visible && (
            <Button
              onClick={secondButtonProps.onClick}
              text={secondButtonProps.text}
              backgroundColor={theme.colors.neutral10}
              borderColor={theme.colors.brand.primary[600]}
              textColor={theme.colors.brand.primary[600]}
              outline
            />
          )}
        </S.ButtonContainer>
      </S.ContentSection>
    </S.Container>
  );
}

export default CardCenterImageButton;
