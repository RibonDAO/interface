import * as S from "./styles";

export type Props = {
  icon?: string;
  title?: string | number;
  text?: string | JSX.Element;
  color?: string;
  size?: "small" | "large";
  biggerContainer?: boolean;
};
function CardTopImage({
  icon,
  title,
  color,
  text,
  size,
  biggerContainer = false,
}: Props): JSX.Element {
  return (
    <S.Container size={size} biggerContainer={biggerContainer}>
      <S.Image src={icon} size={size} />
      <S.Title size={size} titleColor={color}>
        {title}
      </S.Title>
      <S.Text textColor={color}>{text}</S.Text>
    </S.Container>
  );
}

export default CardTopImage;
