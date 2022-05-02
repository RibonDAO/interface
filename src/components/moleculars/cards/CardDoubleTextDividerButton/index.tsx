import theme from "styles/theme";
import Divider from "components/atomics/Divider";
import * as S from "./styles";

export type Props = {
  firstText: string;
  mainText: string;
  rightComplementText: string;
  buttonText: string;
  rightComponentButton: string;
  link: string;
};

const { colors } = theme;
const { lightGray } = colors;

function CardDoubleTextDividerButton({
  firstText,
  mainText,
  rightComplementText,
  buttonText,
  rightComponentButton,
  link,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.FirstText>{firstText}</S.FirstText>
      <S.MainContent>
        {mainText}{" "}
        <S.RightMainContent>{rightComplementText}</S.RightMainContent>
      </S.MainContent>
      <Divider color={lightGray} />
      <S.LinkSection href={link}>
        {buttonText} <S.Image src={rightComponentButton} />
      </S.LinkSection>
    </S.Container>
  );
}

export default CardDoubleTextDividerButton;
