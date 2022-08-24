import LayoutHeader from "layouts/LayoutHeader";
import Navigation from "config/routes/Navigation";
import { menuInFirstDonationFeature } from "config/abTest/features";
import { getLocalStorageItem } from "lib/localStorage";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
  hideHeader?: boolean;
};
function MainLayout({ children, hideHeader = false }: Props): JSX.Element {
  const { signedIn } = useCurrentUser();

  function hasShowNavigationBar() {
    if (
      menuInFirstDonationFeature() ||
      getLocalStorageItem("HAS_DONATED") === "true" ||
      signedIn
    ) {
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
