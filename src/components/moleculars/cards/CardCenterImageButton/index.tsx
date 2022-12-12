import Button from "components/atomics/buttons/Button";
import React from "react";
import securityIcon from "assets/icons/security-mark-icon.svg";
import expandIcon from "assets/icons/expand-icon.svg";
import * as S from "./styles";

export type Props = {
  image: string;
  title?: string;
  buttonText: string;
  onClickButton: () => void;
  onClickImage?: () => void;
  softDisabled?: boolean;
  disabled?: boolean;
  infoTextLeft?: string;
  infoTextRight?: string;
  fullWidth?: boolean;
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
}: Props): JSX.Element {
  return (
    <S.Container fullWidth={fullWidth}>
      <S.ImageSection onClick={onClickImage}>
        <S.ExpandIcon src={expandIcon} />
        <S.Image src={image} alt="image" />
        <S.ImageDescription>{title}</S.ImageDescription>

        <S.DarkStroke />
      </S.ImageSection>

      <S.ContentSection>
        <S.InfoContainer>
          {infoTextLeft && (
            <>
              <S.Info>{infoTextLeft}</S.Info>
              <S.Icon src={securityIcon} />
            </>
          )}
          {infoTextRight && (
            <>
              <S.Bullet> • </S.Bullet>
              <S.Info>{infoTextRight}</S.Info>
            </>
          )}
        </S.InfoContainer>
        <S.ButtonContainer>
          <Button
            onClick={onClickButton}
            text={buttonText}
            softDisabled={softDisabled}
            disabled={disabled}
          />
        </S.ButtonContainer>
      </S.ContentSection>
    </S.Container>
  );
}

export default CardCenterImageButton;
