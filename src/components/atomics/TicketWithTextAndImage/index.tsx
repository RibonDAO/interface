import * as S from "./styles";

export type Props = {
  title?: string;
  subtitle?: string;
  image?: string;
};
function TicketWithTextAndImage({
  title,
  subtitle,
  image,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.LeftContainer>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.LeftContainer>
      <S.RightContainer>
        <S.Image src={image} />
      </S.RightContainer>
    </S.Container>
  );
}

export default TicketWithTextAndImage;
