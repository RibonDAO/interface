import * as S from "./styles";

export type Props = {
  icon?: string;
  title?: string | number;
  text?: string | JSX.Element;
  titleColor?: string;
  textColor?: string;
  size?: "small" | "large";
  label?: string;
};
function CardTopImage({ icon, title, text, size, label }: Props): JSX.Element {
  return (
    <S.Container size={size}>
      <S.Image src={icon} size={size} />
      <S.Title size={size}>{title}</S.Title>
      <S.Text>{text}</S.Text>
      {label && <S.Label>{label}</S.Label>}
    </S.Container>
  );
}

export default CardTopImage;
