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
  infoTextLeft?: string;
  infoTextRight?: string;
  fullWidth?: boolean;
  infoText?: string;
};
function CardCenterImageButton({
  image,
  title,
  buttonText,
  onClickButton,
  onClickImage,
  disabled,
  softDisabled,
  infoTextLeft,
  infoTextRight,
  fullWidth = false,
  infoText,
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
          {infoTextLeft && (
            <S.InfoIcon>
              <S.Info>{infoTextLeft}</S.Info>
              <S.Icon src={securityIcon} />
            </S.InfoIcon>
          )}
          {infoTextRight && <S.Info>{infoTextRight.trim()}</S.Info>}
        </S.InfoContainer>
        <S.ButtonContainer>
          <Button
            onClick={onClickButton}
            text={buttonText}
            softDisabled={softDisabled}
            disabled={disabled}
            backgroundColor={theme.colors.brand.primary[600]}
          />
        </S.ButtonContainer>
      </S.ContentSection>
    </S.Container>
  );
}

export default CardCenterImageButton;
