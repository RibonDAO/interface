import * as S from "./styles";

export type Props = {
  title: string;
  subtitle: string;
  icon?: string;
  rightComponent?: JSX.Element;
};
function CardDoubleText({
  title,
  subtitle,
  rightComponent,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.LeftContainer>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.LeftContainer>
      {rightComponent && <S.RightContainer>{rightComponent}</S.RightContainer>}
    </S.Container>
  );
}

export default CardDoubleText;
