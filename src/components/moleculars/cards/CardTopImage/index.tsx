import * as S from "./styles";

export type Props = {
  icon?: string;
  title?: string | number;
  text?: string | JSX.Element;
  titleColor?: string;
  textColor?: string;
  size?: "small" | "large";
};
function CardTopImage({ icon, title, text, size }: Props): JSX.Element {
  return (
    <S.Container size={size}>
      <S.Image src={icon} size={size} />
      <S.Title size={size}>{title}</S.Title>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}

export default CardTopImage;
