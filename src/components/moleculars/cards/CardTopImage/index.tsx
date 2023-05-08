import * as S from "./styles";

export type Props = {
  icon?: string;
  title?: string | number;
  text?: string | JSX.Element;
  titleColor?: string;
  textColor?: string;
  size?: "small" | "large";
};
function CardTopImage({
  icon,
  title,
  titleColor,
  text,
  textColor,
  size,
}: Props): JSX.Element {
  return (
    <S.Container size={size}>
      <S.Image src={icon} size={size} />
      <S.Title size={size} titleColor={titleColor}>
        {title}
      </S.Title>
      <S.Text textColor={textColor}>{text}</S.Text>
    </S.Container>
  );
}

export default CardTopImage;
