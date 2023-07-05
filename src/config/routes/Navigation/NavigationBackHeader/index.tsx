import Header from "components/atomics/sections/Header";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

function NavigationBackHeader() {
  const { navigateBack } = useNavigation();

  const onBackButtonClick = () => {
    navigateBack();
  };

  return (
    <S.Container>
      <Header hasBackButton onBackButtonClick={onBackButtonClick} />
    </S.Container>
  );
}

export default NavigationBackHeader;
