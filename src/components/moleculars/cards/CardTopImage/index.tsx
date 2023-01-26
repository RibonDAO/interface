import * as S from "./styles";

export type Props = {
  icon?: string;
  value?: string | number;
  text?: string;
};
function CardTopImage({ icon, value, text }: Props): JSX.Element {
  return (
    <S.Container>
      <S.Image src={icon} alt={text} />
      <S.Value>{value}</S.Value>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}

export default CardTopImage;
