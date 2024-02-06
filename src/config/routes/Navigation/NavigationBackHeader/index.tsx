import Header from "components/atomics/sections/Header";
import useNavigation from "hooks/useNavigation";
import TicketsCounter from "layouts/LayoutHeader/TicketsCounter";
import * as S from "./styles";

export type Props = {
  hasTicketCounter?: boolean;
};

function NavigationBackHeader({ hasTicketCounter = false }: Props) {
  const { navigateBack } = useNavigation();

  const onBackButtonClick = () => {
    navigateBack();
  };

  return (
    <S.Container>
      <Header
        hasBackButton
        onBackButtonClick={onBackButtonClick}
        rightComponent={hasTicketCounter ? <TicketsCounter /> : undefined}
      />
    </S.Container>
  );
}

export default NavigationBackHeader;
