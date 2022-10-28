import * as S from "./styles";

export type Props = {
  title?: string;
  subtitle?: string;
  image?: string;
  link?: string;
};
function TicketWithTextAndImage({
  title,
  subtitle,
  image,
  link,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.LeftContainer>
        <S.Title>{title}</S.Title>
        <S.Link href={link}>{subtitle}</S.Link>
      </S.LeftContainer>
      <S.RightContainer>
        <S.Image src={image} />
      </S.RightContainer>
    </S.Container>
  );
}

export default TicketWithTextAndImage;
