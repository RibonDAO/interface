import Icon from "components/atomics/Icon";
import * as S from "./styles";

export type Props = {
  text: string;
  icon: string;
  rightComponent?: JSX.Element;
};
function CardIconText({ text, icon, rightComponent }: Props): JSX.Element {
  return (
    <S.Container>
      <S.InsideContainer>
        <Icon name="icon" />
        <S.Icon alt="left-icon" src={icon} />
        <S.Text>{text}</S.Text>
      </S.InsideContainer>
      {rightComponent && (
        <S.InsideContainer>{rightComponent}</S.InsideContainer>
      )}
    </S.Container>
  );
}

export default CardIconText;
