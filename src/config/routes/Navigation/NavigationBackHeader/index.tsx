import Header from "components/atomics/sections/Header";
import useNavigation from "hooks/useNavigation";

function NavigationBackHeader() {
  const { navigateBack } = useNavigation();

  const onBackButtonClick = () => {
    navigateBack();
  };

  return <Header hasBackButton onBackButtonClick={onBackButtonClick} />;
}

export default NavigationBackHeader;
