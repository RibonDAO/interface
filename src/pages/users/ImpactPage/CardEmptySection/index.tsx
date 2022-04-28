import useNavigation from "hooks/useNavigation";
import { ReactComponent as EmptyIcon } from "./assets/empty-section.svg";
import * as S from "./styles";

export type Props = {
  cardText: string;
  btnText: string;
};
function CardEmptySection({ cardText, btnText }: Props): JSX.Element {
  const { navigateTo } = useNavigation();
  const handleButtonClick = () => {
    navigateTo("/");
  };

  return (
    <S.Container>
      <EmptyIcon width="50px" height="50px" />
      <S.Text>{cardText}</S.Text>
      <S.EmptyDonationButton text={btnText} onClick={handleButtonClick} />
    </S.Container>
  );
}

export default CardEmptySection;
