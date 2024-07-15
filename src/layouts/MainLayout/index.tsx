import LayoutHeader from "layouts/LayoutHeader";
import Navigation from "config/routes/Navigation";
import { isFirstAccess } from "lib/onboardingFirstAccess";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
  hideHeader?: boolean;
  hasBackButton?: boolean;
  outline?: boolean;
  fullSize?: boolean;
  clubMember?: boolean;
  showNavigation?: boolean;
};

function MainLayout({
  children,
  hideHeader = false,
  hasBackButton = false,
  outline = false,
  fullSize = false,
  clubMember = false,
  showNavigation = false,
}: Props): JSX.Element {
  const { signedIn } = useCurrentUser();

  return (
    <>
      {(!isFirstAccess(signedIn) || showNavigation) && <Navigation />}
      {!hideHeader && (
        <LayoutHeader
          hasBackButton={hasBackButton}
          outline={outline}
          clubMember={clubMember}
        />
      )}
      <S.MainContainer isFullSize={fullSize}>
        <S.MainBodyContainer isFullSize={fullSize}>
          {children}
        </S.MainBodyContainer>
      </S.MainContainer>
    </>
  );
}

export default MainLayout;
