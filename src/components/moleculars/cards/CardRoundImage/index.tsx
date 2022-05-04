import * as S from "./styles";

export type Props = {
  image: string;
  logo: string;
  imageAlt?: string;
  logoAlt?: string;
};
function CardRoundImage({
  image,
  logo,
  imageAlt,
  logoAlt,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.CenterImage src={image} alt={imageAlt} />
      <S.LogoContainer>
        <S.LogoImage src={logo} alt={logoAlt} />
      </S.LogoContainer>
    </S.Container>
  );
}

export default CardRoundImage;
