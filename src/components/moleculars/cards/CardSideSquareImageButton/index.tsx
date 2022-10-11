import * as S from "./styles";
import CardSquareImage from "../CardSquareImage";

export type Props = {
  title: string;
  text: string;
  image: string;
  buttonText: string;
  onButtonClick: () => void;
};
function CardSideSquareImageButton({
  title,
  text,
  image,
  buttonText,
  onButtonClick,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.InsideContainer>
        <S.ImageContainer>
          <CardSquareImage image={image} />
        </S.ImageContainer>
        <S.SideButton text={buttonText} onClick={onButtonClick} size="small" />
      </S.InsideContainer>
      <S.InsideContainer>
        <S.Title>{title}</S.Title>
        <S.Text>{text}</S.Text>
      </S.InsideContainer>
    </S.Container>
  );
}

export default CardSideSquareImageButton;
