import LayoutHeader from "layouts/LayoutHeader";
import Navigation from "config/routes/Navigation";
import { isFirstAccess } from "lib/onboardingFirstAccess";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
  hideHeader?: boolean;
};
function MainLayout({ children, hideHeader = false }: Props): JSX.Element {
  const { signedIn } = useCurrentUser();

  return (
    <>
      {!isFirstAccess(signedIn) && <Navigation />}
      <S.MainContainer>
        {!hideHeader && <LayoutHeader />}
        <S.MainBodyContainer>{children}</S.MainBodyContainer>
      </S.MainContainer>
    </>
  );
}

export default MainLayout;
