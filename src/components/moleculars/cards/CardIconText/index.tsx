import * as S from "./styles";

export type Props = {
  text: string;
  icon: string;
  rightComponent?: JSX.Element;
};
function CardIconText({ text, icon, rightComponent }: Props): JSX.Element {
  return (
    <S.Container>
      <S.LeftContainer>
        <S.Icon alt="left-icon" src={icon} />
        <S.Text>{text}</S.Text>
      </S.LeftContainer>
      {rightComponent && <S.RightContainer>{rightComponent}</S.RightContainer>}
    </S.Container>
  );
}

export default CardIconText;
