import * as S from "./styles";

export type Props = {
  icon?: string;
  title?: string | number;
  text?: string | JSX.Element;
  color?: string;
  size?: "small" | "large";
  biggerContainer?: boolean;
  label?: string;
  isTitleLocked?: boolean;
  isTextLocked?: boolean;
};
function CardTopImage({
  icon,
  title,
  color,
  text,
  size,
  biggerContainer = false,
  label,
  isTitleLocked = false,
  isTextLocked = false,
}: Props): JSX.Element {
  return (
    <S.Container size={size} biggerContainer={biggerContainer}>
      <S.Image src={icon} size={size} />
      <S.Title size={size} titleColor={color} isLocked={isTitleLocked}>
        {title}
      </S.Title>
      <S.Text textColor={color} isLocked={isTextLocked}>
        {text}
      </S.Text>
      {label && <S.Label>{label}</S.Label>}
    </S.Container>
  );
}

export default CardTopImage;
