import * as S from "./styles";

export type Props = {
  imageUrl?: string;
  imageAlt?: string;
  text?: string;
};
function CardTopImage({ imageUrl, imageAlt, text }: Props): JSX.Element {
  return (
    <S.Container>
      <S.Image src={imageUrl} alt={imageAlt} />
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}

export default CardTopImage;
