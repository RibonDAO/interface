import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import borderImage from "./assets/border.svg";
import * as S from "./styles";

export type Props = {
  firstButtonText: string;
  secondButtonText: string;
  onFirstButtonClick: () => void;
  onSecondButtonClick: () => void;
  topImage: string;
  bottomImage: string;
  description: string;
};
function CardMarginButtonImage({
  firstButtonText,
  secondButtonText,
  onFirstButtonClick,
  onSecondButtonClick,
  topImage,
  bottomImage,
  description,
}: Props): JSX.Element {
  const mainColor = theme.colors.brand.primary[600];
  return (
    <S.ContentContainer>
      <S.BorderImage src={borderImage} />
      <S.TopImage src={topImage} />
      <S.Description>{description}</S.Description>
      <S.ButtonContainer>
        <Button
          text={firstButtonText}
          onClick={onFirstButtonClick}
          backgroundColor={mainColor}
        />
        <Button
          text={secondButtonText}
          onClick={onSecondButtonClick}
          outline
          borderColor={mainColor}
          textColor={mainColor}
        />
      </S.ButtonContainer>
      <S.BottomImage src={bottomImage} />
    </S.ContentContainer>
  );
}

export default CardMarginButtonImage;
