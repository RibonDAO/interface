import LayoutHeader from "layouts/LayoutHeader";
import Navigation from "config/routes/Navigation";
import { isFirtsAccess } from "lib/onboardingFirstAccess"
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
  hideHeader?: boolean;
};
function MainLayout({ children, hideHeader = false }: Props): JSX.Element {

  return (
    <>
      {!isFirtsAccess() && <Navigation />}
      <S.MainContainer>
        {!hideHeader && <LayoutHeader />}
        <S.MainBodyContainer>{children}</S.MainBodyContainer>
      </S.MainContainer>
    </>
  );
}

export default MainLayout;
