import * as S from "./styles";

export type Props = {
  image: string;
  logo: string;
  logoAlt?: string;
};
function CardRoundImage({ image, logo, logoAlt }: Props): JSX.Element {
  return (
    <S.Container>
      <S.CenterImageContainer backgroundImage={image} />
      <S.LogoContainer>
        <S.LogoImage src={logo} alt={logoAlt} />
      </S.LogoContainer>
    </S.Container>
  );
}

export default CardRoundImage;
