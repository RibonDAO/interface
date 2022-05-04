import * as S from "./styles";

export type Props = {
  leftImage?: string;
  rightImage?: string;
  leftImageAlt?: string;
  rightImageAlt?: string;
};

function CardRoundDoubleImage({
  leftImage,
  rightImage,
  leftImageAlt,
  rightImageAlt,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.ImageContainer>
        <S.LeftImage src={leftImage} alt={leftImageAlt} />
        <S.RightImage src={rightImage} alt={rightImageAlt} />
      </S.ImageContainer>
    </S.Container>
  );
}

export default CardRoundDoubleImage;
