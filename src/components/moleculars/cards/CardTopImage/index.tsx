import * as S from "./styles";

export type Props = {
  imageUrl?: string;
  imageAlt?: string;
  text?: string;
  title?: string;
};
function CardTopImage({ imageUrl, imageAlt, text, title }: Props): JSX.Element {
  return (
    <S.Container>
      <S.Image src={imageUrl} alt={imageAlt} />
      <S.Title>{title}</S.Title>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}

export default CardTopImage;
