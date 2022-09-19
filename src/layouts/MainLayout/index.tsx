import LayoutHeader from "layouts/LayoutHeader";
import Navigation from "config/routes/Navigation";
import { getLocalStorageItem } from "lib/localStorage";
import { useCurrentUser, SHOW_MENU } from "contexts/currentUserContext";
import { menuOnFirstDonationFeature } from "config/abTest/features";
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
  hideHeader?: boolean;
};
function MainLayout({ children, hideHeader = false }: Props): JSX.Element {
  const { signedIn } = useCurrentUser();

  function hasShowNavigationBar() {
    if (
      (signedIn &&
        getLocalStorageItem(SHOW_MENU) === "true" &&
        getLocalStorageItem("HAS_DONATED") === "true") ||
      getLocalStorageItem("HAS_DONATED") === "true"
    ) {
      return true;
    } else if (menuOnFirstDonationFeature()) {
      return true;
    }
    return false;
  }
  return (
    <>
      {hasShowNavigationBar() && <Navigation />}
      <S.MainContainer>
        {!hideHeader && <LayoutHeader />}
        <S.MainBodyContainer>{children}</S.MainBodyContainer>
      </S.MainContainer>
    </>
  );
}

export default MainLayout;
